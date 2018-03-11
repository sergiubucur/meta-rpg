import ItemGenerator from "common/components/item/ItemGenerator";
import ItemRarity from "common/components/item/ItemRarity";
import Utils from "common/Utils";
import characterService from "./CharacterService";
import Slots from "common/components/item/Slots";

const ItemCount = 100;

class VendorService {
	items = [];

	constructor() {
		this.itemGenerator = new ItemGenerator();

		this._generateItems();
	}

	buyItem(item) {
		const index = this.items.indexOf(item);
		if (index > -1) {
			this.items.splice(index, 1);
		}
	}

	cheatResetItems() {
		this._generateItems();
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
