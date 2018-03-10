import ItemType from "./ItemType";

export default class ItemGenerator {
	generateItem(itemLevel, itemType, rarity) {
		const baseItem = {
			itemLevel,
			type: itemType,
			rarity
		};

		const baseBonus = {
			minDamage: 0,
			maxDamage: 0,
			strength: 0,
			dexterity: 0,
			stamina: 0,
			fireResist: 0,
			frostResist: 0,
			lightningResist: 0,
			armor: 0,
			fireDamage: 0,
			frostDamage: 0,
			lightningDamage: 0
		};

		const baseRequirements = {
			level: 0,
			strength: 0,
			dexterity: 0
		};

		const baseWeapon = {
			minDamage: 0,
			maxDamage: 0
		};

		const baseArmor = {
			armor: 0
		};

		const item = {
			...baseItem,

			bonus: baseBonus,
			requirements: baseRequirements
		};

		if (itemType === ItemType.Weapon) {
			Object.assign(item, baseWeapon);
			this._generateWeapon(item);
		} else {
			Object.assign(item, baseArmor);
			this._generateArmor(item);
		}

		item.name = this._generateName(itemLevel, itemType, rarity);

		return item;
	}

	_generateName(itemLevel, itemType, rarity) {
		switch (itemType) {
			case ItemType.Weapon:
				return "Sword";

			case ItemType.Armor:
				return "Breastplate";

			default:
				return "Unknown";
		}
	}

	_generateWeapon(item) {
		item.minDamage = 6;
		item.maxDamage = 16;
		item.bonus.strength = 5;
		item.requirements.level = 1;
		item.requirements.strength = 10;

		return item;
	}

	_generateArmor(item) {
		return item;
	}
}
