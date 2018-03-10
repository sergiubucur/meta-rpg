import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Item.less";

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
		draggable: PropTypes.bool
	}

	render() {
		const { item, draggable, onItemDragStart, onRightClick } = this.props;
		const className = classNames("item", item.image);

		return (
			<div
				className={className}
				draggable={draggable}
				onDragStart={onItemDragStart}
				onContextMenu={onRightClick} />
		);
	}
}
