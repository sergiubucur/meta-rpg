import React, { Component } from "react";
import classNames from "classnames";

import "./ItemTooltip.less";
import StatName from "../StatName";
import SlotName from "./SlotName";
import tooltipService from "common/services/ItemTooltipService";
import characterService from "common/services/CharacterService";
import { RarityClass } from "common/components/item/ItemRarity";

export default class ItemTooltip extends Component {
	componentDidMount() {
		this.tooltipUpdateListener = tooltipService.events.addListener("update", () => {
			this.forceUpdate();
		});

		this.characterUpdateListener = characterService.events.addListener("update", () => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		tooltipService.events.removeListener("update", this.tooltipUpdateListener);
		characterService.events.removeListener("update", this.characterUpdateListener);
	}

	renderWeaponAttributes() {
		const { item } = tooltipService;

		return (
			<div>
				<div>{item.minDamage} - {item.maxDamage}&nbsp;&nbsp;Damage</div>
			</div>
		);
	}

	renderArmorAttributes() {
		const { item } = tooltipService;

		return (
			<div>
				<div>{item.armor}&nbsp;&nbsp;Armor</div>
			</div>
		);
	}

	renderBonusAttributes() {
		const { item } = tooltipService;

		const attributes = Object.keys(item.bonus).filter(key => item.bonus[key] !== 0).map(key => {
			return {
				name: StatName[key],
				value: item.bonus[key]
			};
		});

		return (
			<div>
				{attributes.map((attr, i) => (
					<div key={i}>
						{attr.value > 0 ? "+" : "-"} {attr.value}&nbsp;&nbsp;{attr.name}
					</div>
				))}
			</div>
		);
	}

	renderRequirementsAndValue() {
		const { item, source } = tooltipService;
		const className = classNames({ error: characterService.level < item.requiredLevel });

		return (
			<div>
				{(item.requiredLevel > 1 || source !== "vendor") && <br />}

				<div className={className}>{item.requiredLevel > 1 && `Requires Level ${item.requiredLevel}`}</div>
				{source !== "vendor" && <div className="value">Value:&nbsp;&nbsp;{item.value} gold</div>}
			</div>
		);
	}

	renderComparison() {
	}

	render() {
		const { item, x, y } = tooltipService;

		if (!item) {
			return null;
		}

		const rarityClass = item ? RarityClass[item.rarity] : undefined;
		const className = classNames("item-tooltip", { [rarityClass]: rarityClass });

		return (
			<div className={className} style={{ left: x, top: y }}>
				<div className="name">{item.name}</div>
				{item.itemLevel > 60 && <div>Item Level {item.itemLevel}</div>}
				<div>{SlotName[item.slot]}</div>

				<br />

				{item.slot === "mainHand" && this.renderWeaponAttributes(item)}
				{item.slot !== "mainHand" && item.slot !== "ring" && this.renderArmorAttributes(item)}

				{this.renderBonusAttributes(item)}
				{this.renderRequirementsAndValue(item)}
			</div>
		);
	}
}
