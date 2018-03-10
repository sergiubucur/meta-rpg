import React, { Component } from "react";

import "./InventoryScreen.less";
import Gear from "./gear/Gear";
import Stats from "./stats/Stats";
import Inventory from "./inventory/Inventory";

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
