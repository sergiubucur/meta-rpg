import React from "react";
import PropTypes from "prop-types";

import "./ItemTooltip.less";
import ItemType from "../ItemType";
import BonusAttributeName from "./BonusAttributeName";

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
	return (
		<div>
			{item.requiredLevel > 0 && `Requires: Level ${item.requiredLevel}`}
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
