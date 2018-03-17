import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import StatName from "common/components/item/StatName";
import StatIcon from "common/components/item/StatIcon";

const QuestRequirements = ({ quest }) => {
	const rate = quest.successRatePerAttribute;
	const stat = quest.currentStats;
	const req = quest.requirements;

	let keys = Object.keys(rate).filter(x => x !== "damage" && x !== "armor");
	if (rate.armor !== undefined) {
		keys.unshift("armor");
	}
	if (rate.damage !== undefined) {
		keys.unshift("damage");
	}

	return (
		<div className="quest-requirements">
			{keys.map(key => {
				const name = key === "damage" ? "Damage" : StatName[key];

				return (
					<div key={key} className="row">
						<i className={StatIcon[key]} />
						<span className="name">{name}</span>
						<span className={classNames("values", rate[key] ? "positive" : "negative")}>
							{stat[key]} / {req[key]}
						</span>
					</div>
				);
			})}
		</div>
	);
};

QuestRequirements.propTypes = {
	quest: PropTypes.object.isRequired
};

export default QuestRequirements;
