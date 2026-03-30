type ItemBase = {
	id: string;
	name: string;
};

export interface Item {
	id: ItemId; // アイテム名: 英語
	name: string; // アイテム名: 日本語
}

export const ITEMS = [
	{ id: "Originium Ore", name: "源石鉱物" },
	{ id: "Amethyst Ore", name: "紫晶鉱物" },
	{ id: "Ferrium Ore", name: "青鉄鉱物" },

	{ id: "Origocrust", name: "結晶外殻" },
	{ id: "Amethyst Fiber", name: "紫晶繊維" },
	{ id: "Ferrium", name: "青鉄塊" },

	{ id: "Originium Powder", name: "源石粉末" },
	{ id: "Origocrust Powder", name: "結晶外殻粉末" },
	{ id: "Amethyst Powder", name: "紫晶粉末" },
	{ id: "Ferrium Powder", name: "青鉄粉末" },

	{ id: "Amethyst Bottle", name: "紫晶製ボトル" },
	{ id: "Ferrium Bottle", name: "青鉄製ボトル" },

	{ id: "Amethyst Part", name: "紫晶部品" },
	{ id: "Ferrium Part", name: "鉄製部品" },

	{ id: "Amethyst Component", name: "紫晶装備部品" },
	{ id: "Ferrium Component", name: "青鉄装備部品" },

	{ id: "LC Valley Battery", name: "小容量谷地バッテリー" },
	{ id: "SC Valley Battery", name: "中容量谷地バッテリー" },
] as const satisfies readonly ItemBase[];

export type ItemId = (typeof ITEMS)[number]["id"];
