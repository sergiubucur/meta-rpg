import React, { Component } from "react";

import "./Stats.less";
import characterService from "common/services/CharacterService";

const StatRow = ({ icon, value, name }) => (
	<div>
		<i className={icon} />
		<span className="value">{value}</span>&nbsp;&nbsp;
		<span className="name">{name}</span>
	</div>
);

class Stats extends Component {
	componentDidMount() {
		this.updateListener = characterService.events.addListener("statsUpdate", () => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		characterService.events.removeListener("statsUpdate", this.updateListener);
	}

	render() {
		const { stats } = characterService;

		return (
			<div className="stats">
				<div className="category">
					<StatRow name="Damage" value={stats.damage} icon="ra ra-sword" />
					<StatRow name="Fire Damage" value={stats.fireDamage} icon="ra ra-flame-symbol" />
					<StatRow name="Frost Damage" value={stats.frostDamage} icon="ra ra-kaleidoscope" />
					<StatRow name="Lightning Damage" value={stats.lightningDamage} icon="ra ra-lightning-bolt" />
				</div>
				<div className="category">
					<StatRow name="Armor" value={stats.armor} icon="ra ra-heavy-shield" />
					<StatRow name="Fire Resistance" value={stats.fireResist} icon="ra ra-flame-symbol" />
					<StatRow name="Frost Resistance" value={stats.frostResist} icon="ra ra-kaleidoscope" />
					<StatRow name="Lightning Resistance" value={stats.lightningResist} icon="ra ra-lightning-bolt" />
				</div>
			</div>
		);
	}
}

export default Stats;
