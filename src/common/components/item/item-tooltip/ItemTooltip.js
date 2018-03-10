import React, { Component } from "react";
import classNames from "classnames";

import "./ItemTooltip.less";
import BonusAttributeName from "./BonusAttributeName";
import service from "common/services/ItemTooltipService";
import { RarityClass } from "common/components/item/ItemRarity";

export default class ItemTooltip extends Component {
	componentDidMount() {
		this.updateListener = service.events.addListener("update", () => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		service.events.removeListener("update", this.updateListener);
	}

	renderWeaponAttributes() {
		const { item } = service;

		return (
			<div>
				<div>{item.minDamage} - {item.maxDamage} damage</div>
			</div>
		);
	}

	renderArmorAttributes() {
		const { item } = service;

		return (
			<div>
				<div>{item.armor} armor</div>
			</div>
		);
	}

	renderBonusAttributes() {
		const { item } = service;

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
	}

	renderRequirements() {
		const { item } = service;

		if (item.requiredLevel === 0) {
			return null;
		}

		return (
			<div>
				<br />

				{`Requires: Level ${item.requiredLevel}`}
			</div>
		);
	}

	render() {
		const { item, x, y } = service;

		if (!item) {
			return null;
		}

		const rarityClass = item ? RarityClass[item.rarity] : undefined;
		const className = classNames("item-tooltip", { [rarityClass]: rarityClass });

		return (
			<div className={className} style={{ left: x, top: y }}>
				<strong className="name">{item.name}</strong>

				<br /><br />

				{item.slot === "mainHand" && this.renderWeaponAttributes(item)}
				{item.slot !== "mainHand" && item.slot !== "ring" && this.renderArmorAttributes(item)}

				{this.renderBonusAttributes(item)}
				{this.renderRequirements(item)}
			</div>
		);
	}
}
