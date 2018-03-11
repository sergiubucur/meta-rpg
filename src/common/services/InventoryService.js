import EventDispatcher from "simple-event-dispatcher";
import Utils from "common/Utils";

import ItemGenerator from "common/components/item/ItemGenerator";
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

		this.gear.head = this.itemGenerator.generate(1, "head");
		this.gear.chest = this.itemGenerator.generate(1, "chest");

		const slots = Object.keys(this.gear);

		for (let i = 0; i < InventoryHeight; i++) {
			for (let j = 0; j < InventoryWidth; j++) {
				if (Math.random() < 0.33) {
					this.inventory[i][j] = this.itemGenerator.generate(1, slots[Utils.random(0, 7)]);
				}
			}
		}

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
		if (src.type === "inventory") {
			this.inventory[src.y][src.x] = null;
		}

		if (src.type === "gear") {
			this.gear[src.slot] = null;
			characterService.updateStats(this.gear);
		}

		characterService.modifyGold(Utils.random(1, 100));

		this.events.dispatch("update");
		this.itemDragEnd();
	}
}

export default new InventoryService();
