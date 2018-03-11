import React, { Component } from "react";

import "./SettingsScreen.less";

export default class SettingsScreen extends Component {
	handleResetClick = () => {
	}

	render() {
		return (
			<div className="settings-screen">
				<button type="button" onClick={this.handleResetClick}>Reset</button>
			</div>
		);
	}
}
