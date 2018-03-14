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

	Object.keys(stats).forEach(key => {
		if (key === "minDamage" || key === "maxDamage") {
			stats[key] *= itemLevel * 0.1;
			return;
		}

		if (key === "armor") {
			stats[key] *= itemLevel * itemLevel * 0.01;
			return;
		}
	});
}

function mergeDamage(stats) {
	stats.damage = Math.ceil((stats.minDamage + stats.maxDamage) / 2);

	delete stats.minDamage;
	delete stats.maxDamage;
}

function generateSnapshot() {
	const snapshot = {};

	for (let itemLevel = 1; itemLevel <= 60; itemLevel++) {
		const totalStats = getEmptyStats();

		for (let i = 0; i < SimulationCount; i++) {
			const gear = generateGear(itemLevel, ItemRarity.Common, true);
			const stats = calculateStats(gear);
			addStats(totalStats, stats);
		}

		divideStats(totalStats, SimulationCount);
		applyLowItemLevelFix(totalStats, itemLevel);
		mergeDamage(totalStats);

		Object.keys(totalStats).forEach(key => {
			if (snapshot[key] === undefined) {
				snapshot[key] = [];
			}

			snapshot[key].push(Math.ceil(totalStats[key]));
		});
	}

	return snapshot;
}

function convertToCsv(snapshot) {
	let csv = [];

	// header
	const header = [`"level"`];
	for (let i = 1; i <= 60; i++) {
		header.push(i);
	}
	csv.push(header);

	// rows
	Object.keys(snapshot).forEach(key => {
		csv.push([`"${key}"`, ...snapshot[key]]);
	});

	// merge into one string
	csv.forEach((x) => {
		x = x.join(",");
	});
	csv = csv.join("\n");

	return csv;
}

console.log("Computing...");

const snapshot = generateSnapshot();
console.log(JSON.stringify(snapshot));

console.log("CSV");
console.log(convertToCsv(snapshot));
