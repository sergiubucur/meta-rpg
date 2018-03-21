import EventDispatcher from "simple-event-dispatcher";
import moment from "moment";

import GearSnapshot from "./data/GearSnapshot";
import characterService from "./CharacterService";
import inventoryService from "./InventoryService";
import ItemGenerator from "common/components/item/ItemGenerator";
import ItemRarity from "common/components/item/ItemRarity";
import Slots from "common/components/item/Slots";
import Utils from "common/Utils";
import QuestProgression from "./data/QuestProgression";
import QuestIcons from "./data/QuestIcons";
import TimeTracker from "common/TimeTracker";
import persistenceService from "./PersistenceService";

const UpdateInterval = 900;

class QuestService {
	events = new EventDispatcher();
	itemGenerator = new ItemGenerator();

	quests = [];
	currentQuest = null;
	questResult = null;
	lastUpdated = new Date();

	percentComplete = 0;
	durationLeft = "";
	notify = false;

	constructor() {
		const data = persistenceService.load();

		if (data && data.questData) {
			this.quests = data.questData.quests;
			this.currentQuest = data.questData.currentQuest;
			this.questResult = data.questData.questResult;
			this.lastUpdated = data.questData.lastUpdated;

			this._convertDatesToObjects();

			if (this.currentQuest) {
				this._startTimeTracker();
			} else {
				if (Math.floor((new Date() - moment(this.lastUpdated).toDate()) / 1000) >= UpdateInterval) {
					this.lastUpdated = new Date();
					this.generateQuests();
				}
			}
		}

		if (this.quests.length === 0) {
			this.generateQuests();
		} else {
			this.save();
		}
	}

	save() {
		const data = persistenceService.load() || {};
		data.questData = data.questData || {};

		data.questData.quests = this.quests;
		data.questData.currentQuest = this.currentQuest;
		data.questData.questResult = this.questResult;
		data.questData.lastUpdated = this.lastUpdated;

		persistenceService.save(data);
	}

	generateQuests() {
		this.quests.length = 0;
		this.currentQuest = null;
		this.questResult = null;
		this.percentComplete = 0;
		this.durationLeft = "";
		this.notify = false;

		const icons = Utils.randomSlice(QuestIcons, 3);

		for (let i = 0; i < 3; i++) {
			const quest = this._generateQuest(ItemRarity.Common);
			quest.icon = icons[i];

			this.quests.push(quest);
		}

		this.calculateSuccessRates();
		this.save();
	}

	calculateSuccessRates() {
		this.quests.forEach(x => {
			Object.assign(x, this._getSuccessRateData(x));
		});

		this.events.dispatch("update");
	}

	startQuest(quest) {
		quest.startDate = moment().toDate();
		quest.endDate = this._getQuestEndDate(quest);

		this.currentQuest = quest;
		this._startTimeTracker();
		this.save();
		this.events.dispatch("update");
	}

	completeQuest() {
		this.questResult = this._isQuestSuccessful(this.currentQuest);

		document.title = "*** meta-rpg ***";
		this.notify = true;
		this.save();
		this.events.dispatch("update");
	}

	stopNotification() {
		this.notify = false;
		this.events.dispatch("update");
	}

	getReward() {
		const item = this._generateQuestReward(this.currentQuest);

		if (inventoryService.addItem(item)) {
			characterService.gainXp(this.currentQuest.xp);
			characterService.modifyGold(this.currentQuest.gold);
			inventoryService.setHighlightItem(item);

			return true;
		}

		return false;
	}

	_startTimeTracker() {
		const quest = this.currentQuest;

		const timeTracker = new TimeTracker({
			startDate: quest.startDate,
			endDate: quest.endDate
		}, () => {
			this.percentComplete = timeTracker.getPercentComplete();
			this.durationLeft = timeTracker.getDurationLeft();

			if (this.percentComplete === 1) {
				this.completeQuest();
				return;
			}

			this.events.dispatch("update");
		}, 1000);

		if (timeTracker.getPercentComplete() === 1) {
			this.completeQuest();
			return;
		}

		this.percentComplete = timeTracker.getPercentComplete();
		this.durationLeft = timeTracker.getDurationLeft();
	}

	_getQuestEndDate(quest) {
		const { level } = quest;

		return moment().add(level * 5, "seconds").toDate();
	}

	_generateQuest(rarity) {
		const level = characterService.level;
		const xp = Math.ceil(characterService.getXpToNextLevel() / 3);
		const gold = 0;

		const quest = {
			level,
			rarity,
			xp,
			gold,

			requirements: {
				damage: 0,
				fireDamage: 0,
				frostDamage: 0,
				lightningDamage: 0,
				armor: 0,
				fireResist: 0,
				frostResist: 0,
				lightningResist: 0
			}
		};

		quest.requirements.damage = GearSnapshot.damage[level - 1];
		quest.requirements.armor = GearSnapshot.armor[level - 1];

		this._addExtraRequirements(quest);

		quest.rewardPlaceholderItem = this.itemGenerator.generate(1, Slots[Utils.random(0, 7)], ItemRarity.Common, false);

		return quest;
	}

	_isQuestSuccessful(quest) {
		return Math.random() < quest.successRate;
	}

	_generateQuestReward(quest) {
		const slot = Slots[Utils.random(0, 7)];

		return this.itemGenerator.generate(quest.level, slot, quest.rarity);
	}

	_getSuccessRateData(quest) {
		const { stats } = characterService;

		const rate = {};
		const currentStats = {};

		Object.keys(quest.requirements).forEach(key => {
			const requirement = quest.requirements[key];

			if (requirement > 0) {
				rate[key] = 1;

				if (stats[key] / requirement < 0.9) {
					rate[key] = 0;
				}

				currentStats[key] = stats[key];
			}
		});

		return {
			successRatePerAttribute: rate,
			successRate: Object.keys(rate).reduce((a, x) => a + rate[x], 0) / Object.keys(rate).length,
			currentStats
		};
	}

	_addExtraRequirements(quest) {
		const index = Math.ceil(quest.level / 10) - 1;
		const requirements = QuestProgression[index];

		requirements.forEach(req => {
			const stats = Utils.randomSlice(req.stats, req.count);

			stats.forEach(stat => {
				quest.requirements[stat] = GearSnapshot[stat][quest.level - 1] * req.multiplier;
			});
		});
	}

	_convertQuestDatesToObjects(quest) {
		if (quest.startDate) {
			quest.startDate = moment(quest.startDate).toDate();
		}
		if (quest.endDate) {
			quest.endDate = moment(quest.endDate).toDate();
		}
	}

	_convertDatesToObjects() {
		this.quests.forEach(x => {
			this._convertQuestDatesToObjects(x);
		});

		if (this.currentQuest) {
			this._convertQuestDatesToObjects(this.currentQuest);
		}
	}
}

export default new QuestService();
