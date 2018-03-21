import EventDispatcher from "simple-event-dispatcher";
import moment from "moment";

import ItemGenerator from "common/components/item/ItemGenerator";
import ItemRarity from "common/components/item/ItemRarity";
import Utils from "common/Utils";
import characterService from "./CharacterService";
import inventoryService from "common/services/InventoryService";
import Slots from "common/components/item/Slots";
import persistenceService from "./PersistenceService";

const ItemCount = 100;
const ItemsPerPage = 7;
const UpdateInterval = 900;

class VendorService {
	events = new EventDispatcher();
	itemGenerator = new ItemGenerator();

	items = [];
	lastUpdated = new Date();
	screenData = null;

	constructor() {
		const data = persistenceService.load();

		if (data && data.vendor) {
			this.items = data.vendor.items;
			this.lastUpdated = data.vendor.lastUpdated;

			if (Math.floor((new Date() - moment(this.lastUpdated).toDate()) / 1000) >= UpdateInterval) {
				this.lastUpdated = new Date();
				this._generateItems();
			} else {
				this._resetScreenData();
				this._refreshScreenItems();
			}
		} else {
			this._generateItems();
		}
	}

	save() {
		const data = persistenceService.load() || {};
		data.vendor = data.vendor || {};

		data.vendor.items = this.items;
		data.vendor.lastUpdated = this.lastUpdated;

		persistenceService.save(data);
	}

	changeFilter(name, value) {
		this.screenData[name] = value;
		this._refreshScreenItems();
	}

	buyItem(item) {
		if (characterService.gold < item.vendorValue) {
			this.screenData.errorMessage = "You do not have enough gold.";
			this.events.dispatch("update");

			return;
		}

		if (!inventoryService.addItem(item)) {
			this.screenData.errorMessage = "Inventory is full.";
			this.events.dispatch("update");

			return;
		}

		const index = this.items.indexOf(item);
		if (index > -1) {
			this.items.splice(index, 1);
		}

		characterService.modifyGold(-item.vendorValue);
		this._refreshScreenItems();
		this.save();
	}

	resetFilters() {
		this._resetScreenData();
		this._refreshScreenItems();
	}

	cheatResetItems() {
		this._generateItems();
	}

	_refreshScreenItems() {
		let { items } = this;
		const { slot, sortBy } = this.screenData;
		let { hasAttribute, maxPrice, rarity, maxLevel } = this.screenData;

		items = items.slice(0);

		if (slot) {
			items = items.filter(x => x.slot === slot);
		}

		if (hasAttribute) {
			items = items.filter(x => {
				if (x[hasAttribute] !== 0 && x[hasAttribute] !== undefined) {
					return true;
				}

				if (x.bonus[hasAttribute] !== 0) {
					return true;
				}

				return false;
			});
		}

		rarity = parseInt(rarity, 10);
		if (rarity) {
			items = items.filter(x => x.rarity === rarity);
		}

		maxPrice = parseInt(maxPrice, 10);
		if (maxPrice) {
			items = items.filter(x => x.vendorValue <= maxPrice);
		}

		maxLevel = parseInt(maxLevel, 10);
		if (maxLevel) {
			items = items.filter(x => x.requiredLevel <= maxLevel);
		}

		if (sortBy === "") {
			items.sort((a, b) => {
				return b.vendorValue - a.vendorValue;
			});
		} else {
			items.sort((a, b) => {
				return a.vendorValue - b.vendorValue;
			});
		}

		const totalCount = items.length;
		items = items.slice(0, ItemsPerPage);

		this.screenData.items = items;
		this.screenData.totalCount = totalCount;
		this.screenData.errorMessage = "";

		this.events.dispatch("update");
	}

	_resetScreenData() {
		this.screenData = {
			items: [],
			totalCount: 0,
			sortBy: "",
			slot: "",
			rarity: "",
			hasAttribute: "",
			maxPrice: "",
			maxLevel: "",
			errorMessage: ""
		};
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

		this._resetScreenData();
		this._refreshScreenItems();
		this.save();
	}
}

export default new VendorService();
