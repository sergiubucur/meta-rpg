import React, { Component } from "react";
import PropTypes from "prop-types";

import "./ItemSlot.less";
import Item from "../Item";

export default class ItemSlot extends Component {
	static defaultProps = {
		item: null,
		onItemDrop: () => {},
		x: 0,
		y: 0
	}

	static propTypes = {
		item: PropTypes.object,
		type: PropTypes.string.isRequired,
		onItemDrop: PropTypes.func.isRequired,
		x: PropTypes.number,
		y: PropTypes.number
	}

	handleItemDragStart = (e) => {
		const data = {
			type: this.props.type,
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
				type: this.props.type,
				x: this.props.x,
				y: this.props.y
			});
		}
	}

	render() {
		const { item } = this.props;

		return (
			<div className="item-slot" onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
				{item && <Item item={item} onItemDragStart={this.handleItemDragStart} />}
			</div>
		);
	}
}
