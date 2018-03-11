import EventDispatcher from "simple-event-dispatcher";

import XpToNextLevel, { TotalXpToLevel, MaxXp } from "./XpToNextLevel";

const MaxGold = 99999;

class CharacterService {
	events = new EventDispatcher();

	level = 1;
	xp = 0;
	xpToNextLevel = XpToNextLevel[0];
	gold = 0;
	stats = {};

	modifyGold(amount) {
		this.gold += amount;
		if (this.gold > MaxGold) {
			this.gold = MaxGold;
		}

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
}

const char = new CharacterService();
window.char = char;

export default char;
