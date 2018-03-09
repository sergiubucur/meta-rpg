import React, { Component } from "react";

import "./InventoryScreen.less";
import Gear from "common/components/gear/Gear";
import Stats from "common/components/stats/Stats";
import Inventory from "common/components/inventory/Inventory";

export default class InventoryScreen extends Component {
	render() {
		return (
			<div className="inventory-screen">
				<div className="gear-stats-container">
					<Gear />
					<Stats />
				</div>

				<div className="inventory-container">
					<Inventory />
				</div>
			</div>
		);
	}
}
