import React, { Component } from "react";

import "./Gear.less";
import inventoryService from "common/services/InventoryService";
import GearSlot from "./GearSlot";

class Gear extends Component {
	componentDidMount() {
		this.updateListener = inventoryService.events.addListener("update", () => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		inventoryService.events.removeListener("update", this.updateListener);
	}

	render() {
		const { gear } = inventoryService;

		return (
			<div className="gear">
				<div className="column1">
					<GearSlot slot="hands" item={gear.hands} />
					<GearSlot slot="mainHand" item={gear.hands} />
				</div>

				<div className="column2">
					<GearSlot slot="head" item={gear.head} />
					<GearSlot slot="chest" item={gear.chest} />
					<GearSlot slot="legs" item={gear.legs} />
					<GearSlot slot="feet" item={gear.feet} />
				</div>

				<div className="column3">
					<GearSlot slot="ring" item={gear.ring} />
					<GearSlot slot="offHand" item={gear.offHand} />
				</div>
			</div>
		);
	}
}

export default Gear;
