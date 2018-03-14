import React, { Component } from "react";
import PropTypes from "prop-types";

import "./App.less";
import Navbar from "common/components/navbar/Navbar";
import ItemTooltip from "common/components/item/item-tooltip/ItemTooltip";
// import "common/services/data/NumberTool";

class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	}

	componentDidMount() {
		document.addEventListener("contextmenu", (e) => {
			e.preventDefault();
		}, false);
	}

	render() {
		return (
			<div className="app-container">
				<Navbar />

				<div className="view-container">
					{this.props.children}
				</div>

				<ItemTooltip />
			</div>
		);
	}
}

export default App;
