import EventDispatcher from "simple-event-dispatcher";

export const InventoryWidth = 10;
export const InventoryHeight = 8;

class InventoryService {
	events = new EventDispatcher();
	inventory = {}

	constructor() {
		this.buildMatrix();

		this.inventory[1][2] = { id: 1 };
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

	moveItem(source, destination) {
		let aux = this.inventory[source.y][source.x];
		this.inventory[source.y][source.x] = this.inventory[destination.y][destination.x];
		this.inventory[destination.y][destination.x] = aux;

		this.events.dispatch("update");
	}
}

export default new InventoryService();
