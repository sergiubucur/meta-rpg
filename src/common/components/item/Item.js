import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Item.less";
import inventoryService from "common/services/InventoryService";
import tooltipService from "common/services/ItemTooltipService";

export default class Item extends Component {
	static defaultProps = {
		onRightClick: () => {},
		onItemDragStart: () => {},
		draggable: true
	}

	static propTypes = {
		item: PropTypes.object.isRequired,
		onRightClick: PropTypes.func,
		onItemDragStart: PropTypes.func,
		draggable: PropTypes.bool,
		source: PropTypes.string.isRequired
	}

	handleDragStart = (e) => {
		inventoryService.itemDragStart();
		tooltipService.hide();

		this.props.onItemDragStart(e);
	}

	handleContextMenu = (e) => {
		tooltipService.hide();
		this.props.onRightClick(e);
	}

	handleMouseEnter = (e) => {
		tooltipService.show(this.props.item, this.props.source);
	}

	handleMouseLeave = (e) => {
		tooltipService.hide();
	}

	render() {
		const { item, draggable } = this.props;
		const className = classNames("item", item.image);

		return (
			<div
				className={className}
				draggable={draggable}
				onDragStart={this.handleDragStart}
				onContextMenu={this.handleContextMenu}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave} />
		);
	}
}
