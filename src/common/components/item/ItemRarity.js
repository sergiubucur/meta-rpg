const ItemRarity = {
	Common: 1,
	Rare: 2,
	Epic: 3
};

export const RarityClass = {};
RarityClass[ItemRarity.Common] = "rarity-common";
RarityClass[ItemRarity.Rare] = "rarity-rare";
RarityClass[ItemRarity.Epic] = "rarity-epic";

export default ItemRarity;
