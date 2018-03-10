import React, { Component } from "react";

import "./Inventory.less";
import ItemSlot from "common/components/item/item-slot/ItemSlot";
import inventoryService from "common/services/InventoryService";

class Inventory extends Component {
	componentDidMount() {
		this.updateListener = inventoryService.events.addListener("update", () => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		inventoryService.events.removeListener("update", this.updateListener);
	}

	handleItemDrop = (src, dest) => {
		inventoryService.moveItem(src, dest);
	}

	render() {
		const { inventory } = inventoryService;

		return (
			<div className="inventory">
				{inventory.map((row, rowIndex) => (
					<div key={rowIndex} className="row">
						{row.map((cell, cellIndex) => (
							<ItemSlot
								key={cellIndex}
								item={cell}
								type="inventory"
								x={cellIndex}
								y={rowIndex}
								onItemDrop={this.handleItemDrop} />
						))}
					</div>
				))}
			</div>
		);
	}
}

export default Inventory;
