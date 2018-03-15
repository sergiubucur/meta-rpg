import EventDispatcher from "simple-event-dispatcher";

import GearSnapshot from "./data/GearSnapshot";
import characterService from "./CharacterService";
import inventoryService from "./InventoryService";
import ItemGenerator from "common/components/item/ItemGenerator";
import ItemRarity from "common/components/item/ItemRarity";
import Slots from "common/components/item/Slots";
import Utils from "common/Utils";
import QuestProgression from "./data/QuestProgression";
import QuestState from "./data/QuestState";
import QuestIcons from "./data/QuestIcons";

class QuestService {
	events = new EventDispatcher();
	itemGenerator = new ItemGenerator();

	quests = [];
	currentQuest = null;
	questSuccess = false;
	state = QuestState.PreSelection;

	generateQuests() {
		this.quests.length = 0;
		this.currentQuest = null;

		const icons = Utils.randomSlice(QuestIcons, 3);

		for (let i = 0; i < 3; i++) {
			this.quests[i] = this._generateQuest(ItemRarity.Common);
			this.quests[i].icon = icons[i];
		}

		this.state = QuestState.Selection;
	}

	attemptQuest(quest) {
		this.currentQuest = quest;
		this.state = QuestState.Attempt;
	}

	completeQuest() {
		this.questSuccess = this.isQuestSuccessful(this.currentQuest);
		this.state = QuestState.Completion;
	}

	acquireReward() {
		if (inventoryService.hasRoom()) {
			const item = this.generateQuestReward(this.currentQuest);

			if (inventoryService.addItem(item)) {
				characterService.gainXp(this.currentQuest.xp);
				characterService.modifyGold(this.currentQuest.gold);

				return true;
			}

			return false;
		}

		return false;
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

		quest.successRate = this.calculateSuccessRate(quest);
		quest.rewardPlaceholderItem = this.itemGenerator.generate(1, Slots[Utils.random(0, 7)], ItemRarity.Common, false);

		return quest;
	}

	isQuestSuccessful(quest) {
		return Math.random() < quest.successRate;
	}

	generateQuestReward(quest) {
		const slot = Slots[Utils.random(0, 7)];

		return this.itemGenerator.generate(quest.level, slot, quest.rarity);
	}

	calculateSuccessRate(quest) {
		const { stats } = characterService;

		const rate = {};

		Object.keys(quest.requirements).forEach(key => {
			const requirement = quest.requirements[key];
			const stat = stats[key];

			if (requirement > 0) {
				rate[key] = 1;
				if (stat / requirement < 0.9) {
					rate[key] = 0;
				}
			}
		});

		if (rate.damage === 0 || rate.armor === 0) {
			return 0;
		}

		return Object.keys(rate).reduce((a, x) => a + rate[x], 0) / Object.keys(rate).length;
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
}

export default new QuestService();
