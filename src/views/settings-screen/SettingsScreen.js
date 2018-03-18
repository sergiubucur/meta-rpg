import React, { Component } from "react";

import "./SettingsScreen.less";
import persistenceService from "common/services/PersistenceService";

export default class SettingsScreen extends Component {
	handleResetClick = () => {
		persistenceService.reset();
		window.location.reload();
	}

	render() {
		return (
			<div className="settings-screen">
				<div className="header">
					<strong>Usage</strong>

					<div>Right-click to equip an item.</div>
					<div>CTRL + right-click to sell an item.</div>
					<div>You can also drag and drop the item on the vendor menu (<i className="fa fa-balance-scale" />) to sell it.</div>
				</div>

				<div className="header">
					<button type="button" onClick={this.handleResetClick}>Reset all data</button>
				</div>

				<div className="header">
					<strong>Credits</strong>

					<div>
						<div>
							Item art: OpenGameArt.org&nbsp;(
							<a target="_blank" rel="noopener noreferrer" href="https://opengameart.org/content/osare-weapon-icons">1</a>,&nbsp;
							<a target="_blank" rel="noopener noreferrer" href="https://opengameart.org/content/armor-icons-by-equipment-slot">2</a>,&nbsp;
							<a target="_blank" rel="noopener noreferrer" href="https://opengameart.org/content/flare-item-variation-60x60-only">3</a>)
						</div>
						<div>
							Icons:&nbsp;
							<a target="_blank" rel="noopener noreferrer" href="https://nagoshiashumari.github.io/Rpg-Awesome/">RPG Awesome</a>,&nbsp;
							<a target="_blank" rel="noopener noreferrer" href="https://fontawesome.com/v4.7.0/">Font Awesome</a>
						</div>

						<br />

						<div>Version 0.1 (11 Mar 2018)</div>
						<div>by <a target="_blank" rel="noopener noreferrer" href="https://github.com/sergiubucur">Sergiu-Valentin Bucur</a></div>
					</div>
				</div>
			</div>
		);
	}
}
