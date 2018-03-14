import EventDispatcher from "simple-event-dispatcher";

const Offset = {
	x: 24,
	y: 16
};

class ItemTooltipService {
	events = new EventDispatcher();

	item = null;
	source = null;
	x = 0;
	y = 0;

	constructor() {
		document.addEventListener("mousemove", (e) => {
			const elem = document.querySelector(".item-tooltip");

			this.x = e.pageX + Offset.x;
			this.y = e.pageY + Offset.y;

			if (elem) {
				const rect = elem.getBoundingClientRect();

				if (this.x + rect.width >= window.innerWidth) {
					this.x -= Offset.x * 2 + rect.width;
				}

				if (this.y + rect.height >= window.innerHeight) {
					this.y -= Offset.y * 2 + rect.height;
				}

				elem.style.left = `${this.x}px`;
				elem.style.top = `${this.y}px`;
			}
		});
	}

	show(item, source) {
		this.item = item;
		this.source = source;

		this.events.dispatch("update");
	}

	hide() {
		this.item = null;
		this.source = null;

		this.events.dispatch("update");
	}
}

export default new ItemTooltipService();
