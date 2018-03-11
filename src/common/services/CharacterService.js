import EventDispatcher from "simple-event-dispatcher";

import XpToNextLevel, { TotalXpToLevel, MaxXp } from "./XpToNextLevel";

class CharacterService {
	events = new EventDispatcher();

	level = 1;
	xp = 0;
	xpToNextLevel = XpToNextLevel[0];

	gold = 0;

	gainXp(xp) {
		this.xp += xp;

		if (this.xp > MaxXp) {
			this.xp = MaxXp;
		}

		const level = this.calculateLevel();
		if (this.level < level) {
			this.level = level;
			this.events.dispatch("levelUp");
		}
	}

	getTotalXpToLevel() {
		return TotalXpToLevel[this.level - 1];
	}

	calculateLevel() {
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

export default new CharacterService();
