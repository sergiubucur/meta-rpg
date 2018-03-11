import EventDispatcher from "simple-event-dispatcher";

import ItemGenerator from "common/components/item/ItemGenerator";
import ItemRarity from "common/components/item/ItemRarity";
import Utils from "common/Utils";
import characterService from "./CharacterService";

const ItemCount = 100;
const Slots = ["mainHand", "offHand", "head", "chest", "legs", "feet", "hands", "ring"];

class VendorService {
	events = new EventDispatcher();

	items = [];

	constructor() {
		this.itemGenerator = new ItemGenerator();
	}

	_generateItems() {
		const itemLevel = characterService.level;

		this.items.length = 0;

		let min = Math.max(itemLevel - 5, 1);
		let max = Math.min(itemLevel + 5, 60);

		for (let i = 0; i < ItemCount; i++) {
			const ilvl = Utils.random(min, max);
			const slot = Slots[Utils.random(0, 7)];

			this.items.push(this.itemGenerator.generate(ilvl, slot, ItemRarity.Common));
		}
	}
}

export default new VendorService();
