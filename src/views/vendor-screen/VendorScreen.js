import React, { Component } from "react";

import "./VendorScreen.less";
import vendorService from "common/services/VendorService";
import characterService from "common/services/CharacterService";
import inventoryService from "common/services/InventoryService";
import SlotName from "common/components/item/item-tooltip/SlotName";
import Slots from "common/components/item/Slots";
import Item from "common/components/item/Item";

const ItemsPerPage = 7;

export default class VendorScreen extends Component {
	state = {
		items: [],
		totalCount: 0,
		sortBy: "",
		slot: "",
		rarity: "",
		minPrice: "",
		maxPrice: "",
		maxLevel: "",
		errorMessage: ""
	}

	componentWillMount() {
		this.setState(this.getItems());
	}

	getItems() {
		let { items } = vendorService;
		const { slot, sortBy } = this.state;
		let { minPrice, maxPrice, rarity, maxLevel } = this.state;

		items = items.slice(0);

		if (slot) {
			items = items.filter(x => x.slot === slot);
		}

		rarity = parseInt(rarity, 10);
		if (rarity) {
			items = items.filter(x => x.rarity === rarity);
		}

		minPrice = parseInt(minPrice, 10);
		if (minPrice) {
			items = items.filter(x => x.vendorValue >= minPrice);
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

		return {
			items,
			totalCount,
			errorMessage: ""
		};
	}

	filterChange(name, value) {
		this.setState({
			[name]: value
		}, () => {
			this.setState(this.getItems());
		});
	}

	handleBuyClick = (item) => {
		if (characterService.gold < item.vendorValue) {
			this.setState({
				errorMessage: "You do not have enough gold."
			});

			return;
		}

		if (!inventoryService.addItem(item)) {
			this.setState({
				errorMessage: "Inventory is full."
			});

			return;
		}

		vendorService.buyItem(item);
		characterService.modifyGold(-item.vendorValue);

		this.setState(this.getItems());
	}

	render() {
		const { items, totalCount, sortBy, slot, rarity, minPrice, maxPrice, maxLevel, errorMessage } = this.state;

		return (
			<div className="vendor-screen">
				<div className="filters">
					<div className="filter">
						<div className="name">
						</div>
						<div className="value">
							Showing {items.length} out of {totalCount} items
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Sort by
						</div>
						<div className="value">
							<select value={sortBy} onChange={(e) => this.filterChange("sortBy", e.target.value)}>
								<option value="">Price descending</option>
								<option value="1">Price ascending</option>
							</select>
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Slot
						</div>
						<div className="value">
							<select value={slot} onChange={(e) => this.filterChange("slot", e.target.value)}>
								<option value="">All</option>
								{Slots.map(x => (
									<option key={x} value={x}>{SlotName[x]}</option>
								))}
							</select>
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Rarity
						</div>
						<div className="value">
							<select value={rarity} onChange={(e) => this.filterChange("rarity", e.target.value)}>
								<option value="">All</option>
								<option value="1">Common</option>
								<option value="2">Rare</option>
								<option value="3">Epic</option>
							</select>
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Minimum price
						</div>
						<div className="value">
							<input type="text" value={minPrice} onChange={(e) => this.filterChange("minPrice", e.target.value)} />
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Maximum price
						</div>
						<div className="value">
							<input type="text" value={maxPrice} onChange={(e) => this.filterChange("maxPrice", e.target.value)} />
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Maximum level
						</div>
						<div className="value">
							<input type="text" value={maxLevel} onChange={(e) => this.filterChange("maxLevel", e.target.value)} />
						</div>
					</div>

					<div className="filter">
						<div className="name">
						</div>
						<div className="value error">
							{errorMessage}
						</div>
					</div>
				</div>

				<div className="grid">
					<table>
						<thead>
							<tr>
								<th style={{ width: 64 }}>Item</th>
								<th style={{ width: 128 }}>Slot</th>
								<th style={{ width: 128 }}>Price</th>
								<th style={{ width: 160 }}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item, i) => (
								<tr key={i}>
									<td>
										<Item item={item} draggable={false} vendor />
									</td>
									<td>{SlotName[item.slot]}</td>
									<td className="gold-cell">{item.vendorValue}</td>
									<td>
										<button type="button" onClick={() => this.handleBuyClick(item)}>Buy</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
