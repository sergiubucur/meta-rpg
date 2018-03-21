import React, { Component } from "react";

import "./VendorScreen.less";
import vendorService from "common/services/VendorService";
import SlotName from "common/components/item/item-tooltip/SlotName";
import Slots from "common/components/item/Slots";
import Item from "common/components/item/Item";
import StatName from "common/components/item/StatName";

export default class VendorScreen extends Component {
	componentDidMount() {
		this.updateListener = vendorService.events.addListener("update", () => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		vendorService.events.removeListener("update", this.updateListener);
	}

	handleResetFiltersClick = () => {
		vendorService.resetFilters();
	}

	render() {
		const { items, totalCount, sortBy, slot, rarity, hasAttribute, maxPrice, maxLevel, errorMessage } = vendorService.screenData;

		return (
			<div className="vendor-screen">
				<div className="filters">
					<div className="filter header">
						<div className="left">
							Showing {items.length} out of {totalCount} items
						</div>
						<div className="right">
							<button type="button" onClick={this.handleResetFiltersClick}>
								Clear filters
							</button>
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Sort by
						</div>
						<div className="value">
							<select value={sortBy} onChange={(e) => vendorService.changeFilter("sortBy", e.target.value)}>
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
							<select value={slot} onChange={(e) => vendorService.changeFilter("slot", e.target.value)}>
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
							<select value={rarity} onChange={(e) => vendorService.changeFilter("rarity", e.target.value)}>
								<option value="">All</option>
								<option value="1">Common</option>
								<option value="2">Rare</option>
								<option value="3">Epic</option>
							</select>
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Has attribute
						</div>
						<div className="value">
							<select value={hasAttribute} onChange={(e) => vendorService.changeFilter("hasAttribute", e.target.value)}>
								<option value="">Any</option>
								{Object.keys(StatName).map(x => (
									<option key={x} value={x}>{StatName[x]}</option>
								))}
							</select>
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Maximum price
						</div>
						<div className="value">
							<input type="text" value={maxPrice} onChange={(e) => vendorService.changeFilter("maxPrice", e.target.value)} />
						</div>
					</div>

					<div className="filter">
						<div className="name">
							Maximum level
						</div>
						<div className="value">
							<input type="text" value={maxLevel} onChange={(e) => vendorService.changeFilter("maxLevel", e.target.value)} />
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
										<Item item={item} draggable={false} source="vendor" />
									</td>
									<td>{SlotName[item.slot]}</td>
									<td className="gold-cell">{item.vendorValue}</td>
									<td>
										<button type="button" onClick={() => vendorService.buyItem(item)}>Buy</button>
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
