const ItemRarity = {
	Common: 1,
	Rare: 2,
	Epic: 3
};

export const RarityClass = {};
RarityClass[ItemRarity.Common] = "rarity-common";
RarityClass[ItemRarity.Rare] = "rarity-rare";
RarityClass[ItemRarity.Epic] = "rarity-epic";

export const RarityCost = {};
RarityCost[ItemRarity.Common] = 0.5;
RarityCost[ItemRarity.Rare] = 1.5;
RarityCost[ItemRarity.Epic] = 4.5;

export const RarityStatCoeff = {};
RarityStatCoeff[ItemRarity.Common] = 1;
RarityStatCoeff[ItemRarity.Rare] = 1.25;
RarityStatCoeff[ItemRarity.Epic] = 1.5;

export const RarityBonus = {};
RarityBonus[ItemRarity.Common] = { min: 0, max: 1 };
RarityBonus[ItemRarity.Rare] = { min: 1, max: 2 };
RarityBonus[ItemRarity.Epic] = { min: 2, max: 4 };

export default ItemRarity;
