import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Item from "common/components/item/Item";
import { RarityClass } from "common/components/item/ItemRarity";
import inventoryService from "common/services/InventoryService";

export default class InventorySlot extends Component {
	static defaultProps = {
		item: null,
		onItemDrop: () => {},
		x: 0,
		y: 0,
		highlight: false
	}

	static propTypes = {
		item: PropTypes.object,
		onItemDrop: PropTypes.func.isRequired,
		x: PropTypes.number,
		y: PropTypes.number,
		highlight: PropTypes.bool
	}

	handleItemDragStart = (e) => {
		const data = {
			type: "inventory",
			x: this.props.x,
			y: this.props.y
		};

		e.dataTransfer.dropEffect = "move";
		e.dataTransfer.setData("text", JSON.stringify(data));
	}

	handleDragOver = (e) => {
		e.preventDefault();
	}

	handleDrop = (e) => {
		e.preventDefault();

		let data = e.dataTransfer.getData("text");
		if (data) {
			data = JSON.parse(data);

			this.props.onItemDrop(data, {
				type: "inventory",
				x: this.props.x,
				y: this.props.y
			});
		}
	}

	handleItemRightClick = (e) => {
		if (e.ctrlKey) {
			inventoryService.sellItem({
				type: "inventory",
				x: this.props.x,
				y: this.props.y
			});

			return;
		}

		this.props.onItemDrop({
			type: "inventory",
			x: this.props.x,
			y: this.props.y
		}, {
			type: "gear"
		});
	}

	render() {
		const { item, highlight } = this.props;
		const rarityClass = item ? RarityClass[item.rarity] : undefined;
		const className = classNames("inventory-slot", { [rarityClass]: rarityClass }, { highlight });

		return (
			<div className={className} onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
				{item &&
					<Item
						item={item}
						onItemDragStart={this.handleItemDragStart}
						onRightClick={this.handleItemRightClick}
						source="inventory" />}
			</div>
		);
	}
}
