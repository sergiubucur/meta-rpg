import React, { Component } from "react";

import ItemGenerator from "common/item/ItemGenerator";
import ItemType from "common/item/ItemType";
import ItemRarity from "common/item/ItemRarity";
import ItemTooltip from "common/components/item-tooltip/ItemTooltip";

export default class Dashboard extends Component {
	state = {
		item: null
	}

	componentDidMount() {
		const itemGenerator = new ItemGenerator();

		const item = itemGenerator.generateItem(1, ItemType.Weapon, ItemRarity.Common);
		this.setState({ item });
	}

	render() {
		const { item } = this.state;

		return (
			<div className="dashboard">
				{ item && <ItemTooltip item={item} /> }
			</div>
		);
	}
}
