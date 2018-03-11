import EventDispatcher from "simple-event-dispatcher";

import ItemGenerator from "common/components/item/ItemGenerator";
import ItemRarity from "common/components/item/ItemRarity";
import characterService from "./CharacterService";

export const InventoryWidth = 10;
export const InventoryHeight = 8;

class InventoryService {
	events = new EventDispatcher();
	itemGenerator = new ItemGenerator();

	inventory = {}
	gear = {
		head: null,
		chest: null,
		legs: null,
		feet: null,
		mainHand: null,
		offHand: null,
		hands: null,
		ring: null
	}

	constructor() {
		this.buildMatrix();

		const itemLevel = 58;

		this.gear.mainHand = this.itemGenerator.generate(itemLevel, "mainHand", ItemRarity.Common);
		this.gear.offHand = this.itemGenerator.generate(itemLevel, "offHand", ItemRarity.Common);
		this.gear.head = this.itemGenerator.generate(itemLevel, "head", ItemRarity.Common);
		this.gear.chest = this.itemGenerator.generate(itemLevel, "chest", ItemRarity.Common);
		this.gear.legs = this.itemGenerator.generate(itemLevel, "legs", ItemRarity.Common);
		this.gear.feet = this.itemGenerator.generate(itemLevel, "feet", ItemRarity.Common);
		this.gear.hands = this.itemGenerator.generate(itemLevel, "hands", ItemRarity.Common);
		this.gear.ring = this.itemGenerator.generate(itemLevel, "ring", ItemRarity.Common);

		characterService.updateStats(this.gear);
	}

	buildMatrix() {
		const matrix = [];

		for (let i = 0; i < InventoryHeight; i++) {
			const row = [];

			for (let j = 0; j < InventoryWidth; j++) {
				const cell = null;
				row.push(cell);
			}

			matrix.push(row);
		}

		this.inventory = matrix;
	}

	itemDragStart() {
		this.events.dispatch("itemDrag", "start");
	}

	itemDragEnd() {
		this.events.dispatch("itemDrag", "end");
	}

	moveItem(src, dest) {
		if (src.type === "inventory" && dest.type === "inventory") {
			let aux = this.inventory[src.y][src.x];
			this.inventory[src.y][src.x] = this.inventory[dest.y][dest.x];
			this.inventory[dest.y][dest.x] = aux;

			this.events.dispatch("update");
		}

		if (src.type === "gear" && dest.type === "inventory") {
			let srcItem = this.gear[src.slot];
			let destItem = this.inventory[dest.y][dest.x];

			if (destItem === null || (srcItem.slot === destItem.slot)) {
				this.gear[src.slot] = destItem;
				this.inventory[dest.y][dest.x] = srcItem;

				characterService.updateStats(this.gear);
				this.events.dispatch("update");
			}
		}

		if (src.type === "inventory" && dest.type === "gear") {
			let aux = this.inventory[src.y][src.x];

			if (aux.requiredLevel <= characterService.level) {
				this.inventory[src.y][src.x] = this.gear[aux.slot];
				this.gear[aux.slot] = aux;

				characterService.updateStats(this.gear);
				this.events.dispatch("update");
			}
		}

		this.itemDragEnd();
	}

	sellItem(src) {
		let value = 0;

		if (src.type === "inventory") {
			value = this.inventory[src.y][src.x].value;
			this.inventory[src.y][src.x] = null;
		}

		if (src.type === "gear") {
			value = this.gear[src.slot].value;
			this.gear[src.slot] = null;

			characterService.updateStats(this.gear);
		}

		characterService.modifyGold(value);

		this.events.dispatch("update");
		this.itemDragEnd();
	}
}

export default new InventoryService();
