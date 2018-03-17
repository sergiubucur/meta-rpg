import React, { Component } from "react";

import "./Stats.less";
import characterService from "common/services/CharacterService";
import StatIcon from "common/components/item/StatIcon";

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
					<StatRow name="Damage" value={stats.damage} icon={StatIcon.damage} />
					<StatRow name="Fire Damage" value={stats.fireDamage} icon={StatIcon.fireDamage} />
					<StatRow name="Frost Damage" value={stats.frostDamage} icon={StatIcon.frostDamage} />
					<StatRow name="Lightning Damage" value={stats.lightningDamage} icon={StatIcon.lightningDamage} />
				</div>
				<div className="category">
					<StatRow name="Armor" value={stats.armor} icon={StatIcon.armor} />
					<StatRow name="Fire Resistance" value={stats.fireResist} icon={StatIcon.fireResist} />
					<StatRow name="Frost Resistance" value={stats.frostResist} icon={StatIcon.frostResist} />
					<StatRow name="Lightning Resistance" value={stats.lightningResist} icon={StatIcon.lightningResist} />
				</div>
			</div>
		);
	}
}

export default Stats;
