import EventDispatcher from "simple-event-dispatcher";

class ItemTooltipService {
	events = new EventDispatcher();

	item = null;
	vendor = false;
	x = 0;
	y = 0;

	constructor() {
		document.addEventListener("mousemove", (e) => {
			const elem = document.querySelector(".item-tooltip");

			this.x = e.pageX + 24;
			this.y = e.pageY + 16;

			if (elem) {
				elem.style.left = `${this.x}px`;
				elem.style.top = `${this.y}px`;
			}
		});
	}

	show(item, vendor) {
		this.item = item;
		this.vendor = vendor;

		this.events.dispatch("update");
	}

	hide() {
		this.item = null;
		this.vendor = false;

		this.events.dispatch("update");
	}
}

export default new ItemTooltipService();
