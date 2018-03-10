import ItemSlotInfo from "./ItemSlotInfo";
import Utils from "common/Utils";

export default class ItemGenerator {
	generate(itemLevel, slot, rarity) {
		if (!rarity) {
			rarity = Utils.random(1, 3);
		}

		const baseItem = {
			itemLevel,
			slot,
			rarity,
			requiredLevel: 0
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

		const baseWeapon = {
			minDamage: 0,
			maxDamage: 0
		};

		const baseArmor = {
			armor: 0
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
				Object.assign(item, baseWeapon);
				this._generateWeapon(item);
				break;

			case "ring":
				this._generateRing(item);
				break;

			default:
				Object.assign(item, baseArmor);
				this._generateArmor(item);
				break;
		}

		return item;
	}

	_generateWeapon(item) {
		item.minDamage = Utils.random(1, 5);
		item.maxDamage = Utils.random(6, 10);
		item.requiredLevel = 2;
	}

	_generateRing(item) {
		item.bonus.minDamage = Utils.random(0, 5);
		item.bonus.maxDamage = Utils.random(0, 5);
		item.bonus.fireResist = Utils.random(0, 5);
		item.bonus.frostResist = Utils.random(0, 5);
		item.bonus.lightningResist = Utils.random(0, 5);
		item.bonus.armor = Utils.random(0, 5);
		item.bonus.fireDamage = Utils.random(0, 5);
		item.bonus.frostDamage = Utils.random(0, 5);
		item.bonus.lightningDamage = Utils.random(0, 5);

		item.requiredLevel = 3;
	}

	_generateArmor(item) {
		item.armor = Utils.random(1, 10);
	}
}
