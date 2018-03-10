import EventDispatcher from "simple-event-dispatcher";

export const InventoryWidth = 10;
export const InventoryHeight = 8;

class InventoryService {
	events = new EventDispatcher();

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

		this.gear.head = { id: 1 };
		this.inventory[1][2] = { id: 2 };
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
		}

		if (src.type === "gear" && dest.type === "inventory") {
			let aux = this.gear[src.slot];
			this.gear[src.slot] = this.inventory[dest.y][dest.x];
			this.inventory[dest.y][dest.x] = aux;
		}

		this.events.dispatch("update");
	}
}

export default new InventoryService();
