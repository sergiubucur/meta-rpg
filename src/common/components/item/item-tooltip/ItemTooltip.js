import React, { Component } from "react";
import classNames from "classnames";

import "./ItemTooltip.less";
import StatName from "../StatName";
import SlotName from "./SlotName";
import tooltipService from "common/services/ItemTooltipService";
import characterService from "common/services/CharacterService";
import inventoryService from "common/services/InventoryService";
import questService from "common/services/QuestService";
import { RarityClass } from "common/components/item/ItemRarity";

export default class ItemTooltip extends Component {
	componentDidMount() {
		this.tooltipUpdateListener = tooltipService.events.addListener("update", () => {
			this.forceUpdate();
		});

		this.characterUpdateListener = characterService.events.addListener("update", () => {
			this.forceUpdate();
		});

		this.questUpdateListener = questService.events.addListener("update", () => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		tooltipService.events.removeListener("update", this.tooltipUpdateListener);
		characterService.events.removeListener("update", this.characterUpdateListener);
		questService.events.removeListener("update", this.questUpdateListener);
	}

	renderWeaponAttributes() {
		const { item } = tooltipService;

		return (
			<div>{item.minDamage} - {item.maxDamage}&nbsp;&nbsp;Damage</div>
		);
	}

	renderArmorAttributes() {
		const { item } = tooltipService;

		return (
			<div>{item.armor}&nbsp;&nbsp;Armor</div>
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

		if (item.requiredLevel === 1 && source === "vendor") {
			return null;
		}

		return (
			<div>
				<div className={className}>{item.requiredLevel > 1 && `Requires Level ${item.requiredLevel}`}</div>
				{source !== "vendor" && <div className="value">Value:&nbsp;&nbsp;{item.value} gold</div>}
			</div>
		);
	}

	renderComparison() {
		const { item } = tooltipService;
		const stats = inventoryService.compareItem(item);

		if (Object.keys(stats).filter(x => stats[x] !== 0).length === 0) {
			return null;
		}

		return (
			<div>
				<div style={{ marginBottom: 5 }}>Versus current item:</div>

				{Object.keys(stats).map(key => {
					const stat = stats[key];

					if (stat === 0) {
						return null;
					}

					return (
						<div key={key} className={stat > 0 ? "positive" : "negative"}>
							{stat > 0 && "+"}{stat < 0 && "-"}&nbsp;&nbsp;{Math.abs(stat)} {StatName[key]}
						</div>
					);
				})}
			</div>
		);
	}

	render() {
		const { item, source, x, y } = tooltipService;
		const questActive = questService.currentQuest !== null;

		if (!item) {
			return null;
		}

		const rarityClass = item ? RarityClass[item.rarity] : undefined;
		const className = classNames("item-tooltip", { [rarityClass]: rarityClass }, { reward: source === "reward" });

		if (source === "reward") {
			return (
				<div className={className} style={{ left: x, top: y }}>
					<div>
						Random item of any slot, <br />
						with a level requirement equal to <br />
						or slightly above your current level.
					</div>
					<div>
						Can be <span className="rarity-common">Common</span>, <span className="rarity-rare">Rare</span> or <span className="rarity-epic">Epic</span>.
					</div>
				</div>
			);
		}

		return (
			<div className={className} style={{ left: x, top: y }}>
				<div>
					<div className="name">{item.name}</div>
					{item.itemLevel > 60 && <div>Item Level {item.itemLevel}</div>}
					<div>{SlotName[item.slot]}</div>
				</div>

				<div>
					{item.slot === "mainHand" && this.renderWeaponAttributes()}
					{item.slot !== "mainHand" && item.slot !== "ring" && this.renderArmorAttributes()}

					{this.renderBonusAttributes()}
				</div>

				{this.renderRequirementsAndValue()}
				{source !== "gear" && this.renderComparison()}
				{source === "gear" && questActive && <div className="error">Gear cannot be changed<br />while you're on a quest.</div>}
			</div>
		);
	}
}
