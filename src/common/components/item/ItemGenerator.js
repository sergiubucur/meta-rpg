import ItemSlotInfo from "./ItemSlotInfo";
import ItemRarity, { RarityCost, RarityStatCoeff, RarityBonus } from "./ItemRarity";
import Utils from "common/Utils";

export default class ItemGenerator {
	generate(itemLevel, slot, rarity = ItemRarity.Common, canBoost = true) {
		if (canBoost) {
			rarity = this._boostRarity(rarity);
			itemLevel = this._boostItemLevel(itemLevel);
		}

		const baseItem = {
			itemLevel,
			slot,
			rarity,
			requiredLevel: Math.min(60, itemLevel),
			value: 1,

			minDamage: 0,
			maxDamage: 0,
			armor: 0
		};

		const baseBonus = {
			minDamage: 0,
			maxDamage: 0,
			fireResist: 0,
			frostResist: 0,
			lightningResist: 0,
			armor: 0,
			fireDamage: 0,
			frostDamage: 0,
			lightningDamage: 0
		};

		const item = {
			...baseItem,
			bonus: baseBonus
		};

		const slotInfo = ItemSlotInfo[item.slot];

		item.name = slotInfo.names[0];
		item.image = `${item.slot}${Utils.random(slotInfo.image.min, slotInfo.image.max)}`;

		switch (item.slot) {
			case "mainHand":
				this._generateWeapon(item);
				break;

			case "ring":
				break;

			default:
				this._generateArmor(item);
				break;
		}

		this._addBonusStats(item);
		item.value = this._calculateValue(item);
		item.vendorValue = item.value * 4;

		return item;
	}

	_calculateValue(item) {
		let result = item.itemLevel * 10 * RarityCost[item.rarity];
		let bonus = 0;

		Object.keys(item.bonus).forEach(key => {
			if (item.bonus[key] > 0) {
				bonus++;
			}
		});

		bonus = 1 + bonus * 0.1;
		result *= bonus;
		result = this._randomize(result);

		return Math.floor(result);
	}

	_boostRarity(rarity) {
		if (rarity === ItemRarity.Common) {
			if (Math.random() < 0.25) {
				return ItemRarity.Rare;
			}

			if (Math.random() < 0.1) {
				return ItemRarity.Epic;
			}

			return rarity;
		}

		if (rarity === ItemRarity.Rare) {
			if (Math.random() < 0.1) {
				return ItemRarity.Epic;
			}
		}

		return rarity;
	}

	_boostItemLevel(itemLevel) {
		let boost = 0;

		if (Math.random() < 0.1) {
			boost = Utils.random(3, 5);
		}

		if (Math.random() < 0.25) {
			boost = Utils.random(1, 2);
		}

		return itemLevel + boost;
	}

	_generateWeapon(item) {
		const coeff = item.itemLevel * RarityStatCoeff[item.rarity];

		item.minDamage = Math.floor(this._randomize(coeff * Utils.random(2, 4)));
		item.maxDamage = Math.floor(this._randomize(coeff * Utils.random(6, 8)));
	}

	_generateArmor(item) {
		const coeff = item.itemLevel * RarityStatCoeff[item.rarity];

		item.armor = Math.floor(this._randomize(coeff * Utils.random(1, 3)));
	}

	_addBonusStats(item) {
		const coeff = item.itemLevel * RarityStatCoeff[item.rarity];
		const bonusLimit = RarityBonus[item.rarity];

		let min = bonusLimit.min;
		let max = bonusLimit.max;

		if (item.slot === "ring") {
			min++;
			max++;
		}

		const bonusCount = Utils.random(min, max);
		const bonus = Utils.randomSlice(Object.keys(item.bonus), bonusCount);

		bonus.forEach(key => {
			item.bonus[key] = Math.floor(this._randomize(coeff));
		});
	}

	_randomize(value) {
		const newValue = value + (Math.random() * 0.1 * value) - 0.05 * value;

		if (value >= 1 && newValue < 1) {
			return value;
		}

		return newValue;
	}
}
