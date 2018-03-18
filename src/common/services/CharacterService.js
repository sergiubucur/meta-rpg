import EventDispatcher from "simple-event-dispatcher";

import XpToNextLevel, { TotalXpToLevel, MaxXp } from "./data/XpToNextLevel";
import persistenceService from "./PersistenceService";

const MaxGold = 99999;

class CharacterService {
	events = new EventDispatcher();

	level = 1;
	xp = 0;
	xpToNextLevel = XpToNextLevel[0];
	gold = 0;
	stats = {};

	constructor() {
		const data = persistenceService.load();

		if (data && data.character) {
			this.level = data.character.level;
			this.xp = data.character.xp;
			this.xpToNextLevel = data.character.xpToNextLevel;
			this.gold = data.character.gold;
		}

		this.save();
	}

	save() {
		const data = persistenceService.load() || {};
		data.character = data.character || {};

		data.character.level = this.level;
		data.character.xp = this.xp;
		data.character.xpToNextLevel = this.xpToNextLevel;
		data.character.gold = this.gold;

		persistenceService.save(data);
	}

	modifyGold(amount) {
		this.gold += amount;
		if (this.gold > MaxGold) {
			this.gold = MaxGold;
		}

		this.save();
		this.events.dispatch("update");
	}

	gainXp(xp) {
		this.xp += xp;

		if (this.xp > MaxXp) {
			this.xp = MaxXp;
		}

		const level = this._calculateLevel();
		if (this.level < level) {
			this.level = level;
		}

		this.save();
		this.events.dispatch("update");
	}

	updateStats(gear) {
		this.stats.minDamage = 1;
		this.stats.maxDamage = 2;
		this.stats.fireResist = 0;
		this.stats.frostResist = 0;
		this.stats.lightningResist = 0;
		this.stats.armor = 0;
		this.stats.fireDamage = 0;
		this.stats.frostDamage = 0;
		this.stats.lightningDamage = 0;

		Object.keys(gear).forEach(key => {
			const item = gear[key];

			if (!item) {
				return;
			}

			if (item.slot === "mainHand") {
				this.stats.minDamage += item.minDamage;
				this.stats.maxDamage += item.maxDamage;
			} else {
				if (item.slot !== "ring") {
					this.stats.armor += item.armor;
				}
			}

			Object.keys(item.bonus).forEach(bonusKey => {
				this.stats[bonusKey] += item.bonus[bonusKey];
			});
		});

		this.stats.damage = Math.floor((this.stats.minDamage + this.stats.maxDamage) / 2);

		this.events.dispatch("statsUpdate");
	}

	getXpToNextLevel() {
		return this.level === 60 ? 0 : XpToNextLevel[this.level - 1];
	}

	getTotalXpToLevel() {
		return TotalXpToLevel[this.level - 1];
	}

	_calculateLevel() {
		if (this.xp === MaxXp) {
			return 60;
		}

		let totalXp = 0;
		let level = 0;

		while (this.xp >= totalXp) {
			totalXp += XpToNextLevel[level];
			level++;
		}

		return level;
	}

	cheatLevelUp() {
		this.gainXp(this.getXpToNextLevel());
	}

	cheatGiveGold() {
		this.modifyGold(10000);
	}
}

export default new CharacterService();
