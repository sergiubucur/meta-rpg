import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Item.less";

export default class Item extends Component {
	static defaultProps = {
		onItemDragStart: () => {}
	}

	static propTypes = {
		onItemDragStart: PropTypes.func.isRequired
	}

	render() {
		return (
			<div
				className="item"
				draggable
				onDragStart={this.props.onItemDragStart} />
		);
	}
}
