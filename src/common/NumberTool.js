import ItemGenerator from "common/components/item/ItemGenerator";
import ItemRarity from "common/components/item/ItemRarity";

const SimulationCount = 1000;
const itemGenerator = new ItemGenerator();

function generateGear(itemLevel, rarity, canBoost) {
	return {
		mainHand: itemGenerator.generate(itemLevel, "mainHand", rarity, canBoost),
		offHand: itemGenerator.generate(itemLevel, "offHand", rarity, canBoost),
		head: itemGenerator.generate(itemLevel, "head", rarity, canBoost),
		chest: itemGenerator.generate(itemLevel, "chest", rarity, canBoost),
		legs: itemGenerator.generate(itemLevel, "legs", rarity, canBoost),
		feet: itemGenerator.generate(itemLevel, "feet", rarity, canBoost),
		hands: itemGenerator.generate(itemLevel, "hands", rarity, canBoost),
		ring: itemGenerator.generate(itemLevel, "ring", rarity, canBoost),
	};
}

function getEmptyStats() {
	return {
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
}

function calculateStats(gear) {
	const stats = getEmptyStats();

	Object.keys(gear).forEach(key => {
		const item = gear[key];

		stats.minDamage += item.minDamage || 0;
		stats.maxDamage += item.maxDamage || 0;
		stats.armor += item.armor || 0;

		Object.keys(item.bonus).forEach(bonusKey => {
			stats[bonusKey] += item.bonus[bonusKey];
		});
	});

	return stats;
}

function addStats(a, b) {
	Object.keys(a).forEach(key => {
		a[key] += b[key];
	});
}

function divideStats(a, n) {
	Object.keys(a).forEach(key => {
		a[key] /= n;
	});
}

function applyLowItemLevelFix(stats, itemLevel) {
	if (itemLevel >= 10) {
		return;
	}

	const coeff = 0.5 + itemLevel * 0.05;

	Object.keys(stats).forEach(key => {
		stats[key] *= coeff;
	});
}

function generateSnapshot(rarity) {
	const snapshot = {};

	for (let itemLevel = 1; itemLevel <= 60; itemLevel++) {
		const totalStats = getEmptyStats();

		for (let i = 0; i < SimulationCount; i++) {
			const gear = generateGear(itemLevel, rarity, true);
			const stats = calculateStats(gear);
			addStats(totalStats, stats);
		}

		divideStats(totalStats, SimulationCount);
		applyLowItemLevelFix(totalStats, itemLevel);

		Object.keys(totalStats).forEach(key => {
			if (snapshot[key] === undefined) {
				snapshot[key] = [];
			}

			snapshot[key].push(Math.ceil(totalStats[key]));
		});
	}

	return snapshot;
}

console.log("Computing...");

const common = generateSnapshot(ItemRarity.Common);
const rare = generateSnapshot(ItemRarity.Rare);
const epic = generateSnapshot(ItemRarity.Epic);

console.log("common:", JSON.stringify(common));
console.log("rare:", JSON.stringify(rare));
console.log("epic:", JSON.stringify(epic));
