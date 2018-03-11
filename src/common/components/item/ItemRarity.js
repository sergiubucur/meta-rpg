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

export const RarityMaxBonus = {};
RarityMaxBonus[ItemRarity.Common] = 1;
RarityMaxBonus[ItemRarity.Rare] = 2;
RarityMaxBonus[ItemRarity.Epic] = 4;

export default ItemRarity;
