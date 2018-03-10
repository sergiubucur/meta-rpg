import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Item from "common/components/item/Item";
import { RarityClass } from "common/components/item/ItemRarity";

export default class GearSlot extends Component {
	static defaultProps = {
		item: null
	}

	static propTypes = {
		item: PropTypes.object,
		slot: PropTypes.string.isRequired
	}

	handleItemDragStart = (e) => {
		const data = {
			type: "gear",
			slot: this.props.slot
		};

		e.dataTransfer.dropEffect = "move";
		e.dataTransfer.setData("text", JSON.stringify(data));
	}

	render() {
		const { item } = this.props;
		const rarityClass = item ? RarityClass[item.rarity] : undefined;
		const className = classNames("gear-slot", this.props.slot, { [rarityClass]: rarityClass });

		return (
			<div className={className}>
				{item && <Item item={item} onItemDragStart={this.handleItemDragStart} />}
			</div>
		);
	}
}
