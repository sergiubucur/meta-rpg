import React, { Component } from "react";
import PropTypes from "prop-types";

import "./App.less";

class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default App;
