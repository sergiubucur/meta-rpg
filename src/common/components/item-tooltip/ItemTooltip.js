import React from "react";
import PropTypes from "prop-types";

import "./ItemTooltip.less";
import ItemType from "common/item/ItemType";
import BonusAttributeName from "./BonusAttributeName";
import RequirementName from "./RequirementName";

const renderWeaponAttributes = (item) => (
	<div>
		<div>{item.minDamage} - {item.maxDamage} dmg</div>
	</div>
);

const renderArmorAttributes = (item) => (
	<div>
		<div>{item.armor} armor</div>
	</div>
);

const renderBonusAttributes = (item) => {
	const attributes = Object.keys(item.bonus).filter(key => item.bonus[key] !== 0).map(key => {
		return {
			name: BonusAttributeName[key],
			value: item.bonus[key]
		};
	});

	return (
		<div>
			{attributes.map((attr, i) => (
				<div key={i}>
					{attr.value > 0 ? "+" : "-"} {attr.value} {attr.name}
				</div>
			))}
		</div>
	);
};

const renderRequirements = (item) => {
	const requirements = Object.keys(item.requirements).filter(key => item.requirements[key] > 0).map(key => {
		const name = RequirementName[key];
		const value = item.requirements[key];

		if (key === "level") {
			return `${name} ${value}`;
		}

		return `${value} ${name}`;
	});

	return (
		<div>
			{requirements.length > 0 && <div>Requires:</div>}
			<ul>
				{requirements.map((req, i) => (
					<li key={i}>{req}</li>
				))}
			</ul>
		</div>
	);
};

const ItemTooltip = ({ item }) => (
	<div className="item-tooltip">
		<strong>{item.name}</strong>

		<br/><br/>

		{item.type === ItemType.Weapon && renderWeaponAttributes(item)}
		{item.type === ItemType.Armor && renderArmorAttributes(item)}

		{renderBonusAttributes(item)}

		<br/>

		{renderRequirements(item)}
	</div>
);

ItemTooltip.propTypes = {
	item: PropTypes.object.isRequired
};

export default ItemTooltip;
