import EventDispatcher from "simple-event-dispatcher";

import GearSnapshot from "./GearSnapshot";
import characterService from "./CharacterService";
import inventoryService from "./InventoryService";
import ItemGenerator from "common/components/item/ItemGenerator";
import Slots from "common/components/item/Slots";
import Utils from "common/Utils";
import QuestProgression from "./QuestProgression";

class QuestLogService {
	events = new EventDispatcher();
	itemGenerator = new ItemGenerator();

	generateQuest(rarity) {
		const level = characterService.level;
		const xp = Math.ceil(characterService.getXpToNextLevel() / 3);
		const gold = 0;

		const quest = {
			level,
			rarity,
			xp,
			gold,

			requirements: {
				minDamage: 0,
				maxDamage: 0,
				fireDamage: 0,
				frostDamage: 0,
				lightningDamage: 0,
				armor: 0,
				fireResist: 0,
				frostResist: 0,
				lightningResist: 0
			}
		};

		const snapshot = GearSnapshot[rarity];

		quest.requirements.minDamage = snapshot.minDamage[level - 1];
		quest.requirements.maxDamage = snapshot.maxDamage[level - 1];
		quest.requirements.armor = snapshot.armor[level - 1];

		this._addExtraRequirements(quest);

		quest.successRate = this.calculateSuccessRate(quest);

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

		let successRate = 0;
		let count = 0;

		Object.keys(quest.requirements).forEach(key => {
			const requirement = quest.requirements[key];
			const stat = stats[key];

			if (requirement > 0) {
				let rate = Math.min(stat / requirement, 1);
				if (rate < 0.9) {
					rate = 0;
				}

				successRate += rate;
				count++;
			}
		});

		return successRate / count;
	}

	_addExtraRequirements(quest) {
		const snapshot = GearSnapshot[quest.rarity];

		const index = Math.ceil(quest.level / 10) - 1;
		const requirements = QuestProgression[index];

		requirements.forEach(req => {
			const stats = Utils.shuffle(req.stats.slice(0)).slice(0, req.count);

			stats.forEach(stat => {
				quest.requirements[stat] = snapshot[stat][quest.level - 1];
			});
		});
	}
}

const questLog = new QuestLogService();
window.quest = () => {
	const quest = questLog.generateQuest(1);
	console.log("success rate", quest.successRate.toFixed(2));
	console.log("requirements", Object.keys(quest.requirements).filter(x => quest.requirements[x] > 0).map(x => x + " " + quest.requirements[x]));

	if (questLog.isQuestSuccessful(quest)) {
		const item = questLog.generateQuestReward(quest);

		if (inventoryService.addItem(item)) {
			characterService.gainXp(quest.xp);
			characterService.modifyGold(quest.gold);

			console.log("quest completed successfully");
		} else {
			console.log("error: inventory is full");
		}
	} else {
		console.log("quest failed");
	}
};

export default new QuestLogService();
