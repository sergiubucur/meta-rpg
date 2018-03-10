import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Item.less";

export default class Item extends Component {
	static defaultProps = {
		onItemDragStart: () => {}
	}

	static propTypes = {
		item: PropTypes.object.isRequired,
		onItemDragStart: PropTypes.func.isRequired
	}

	render() {
		const { item } = this.props;
		const className = classNames("item", item.image);

		return (
			<div
				className={className}
				draggable
				onDragStart={this.props.onItemDragStart} />
		);
	}
}
