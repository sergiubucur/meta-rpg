import EventDispatcher from "simple-event-dispatcher";

import ItemGenerator from "common/components/item/ItemGenerator";

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

		this.gear.head = this.itemGenerator.generate(1, "head");
		this.gear.chest = this.itemGenerator.generate(1, "chest");

		this.inventory[0][0] = this.itemGenerator.generate(1, "head");
		this.inventory[0][1] = this.itemGenerator.generate(1, "chest");
		this.inventory[0][2] = this.itemGenerator.generate(1, "legs");
		this.inventory[0][3] = this.itemGenerator.generate(1, "feet");
		this.inventory[0][4] = this.itemGenerator.generate(1, "hands");
		this.inventory[0][5] = this.itemGenerator.generate(1, "ring");
		this.inventory[0][6] = this.itemGenerator.generate(1, "mainHand");
		this.inventory[0][7] = this.itemGenerator.generate(1, "offHand");
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

				this.events.dispatch("update");
			}
		}

		if (src.type === "inventory" && dest.type === "gear") {
			let aux = this.inventory[src.y][src.x];
			this.inventory[src.y][src.x] = this.gear[aux.slot];
			this.gear[aux.slot] = aux;

			this.events.dispatch("update");
		}
	}
}

export default new InventoryService();
