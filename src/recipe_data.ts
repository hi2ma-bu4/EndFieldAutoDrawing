import { MachineId } from "./facilities_data";
import { ItemId } from "./item_data";

export interface Ingredient {
	count: number;
	itemId: ItemId;
}

export interface Recipe {
	machineId: MachineId; // 使用する機械のID
	ingredients: Ingredient[];
	producedItemId: ItemId; // 製造アイテムID
	producedCount: number; // 製造個数
	processingTime: number; // 製造時間(s)
}

export const RECIPES = [
	{
		machineId: "Refining Unit",
		ingredients: [{ count: 1, itemId: "Originium Ore" }],
		producedItemId: "Origocrust",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Refining Unit",
		ingredients: [{ count: 1, itemId: "Originium Powder" }],
		producedItemId: "Origocrust Powder",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Refining Unit",
		ingredients: [{ count: 1, itemId: "Origocrust Powder" }],
		producedItemId: "Origocrust",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Refining Unit",
		ingredients: [{ count: 1, itemId: "Amethyst Ore" }],
		producedItemId: "Amethyst Fiber",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Refining Unit",
		ingredients: [{ count: 1, itemId: "Amethyst Powder" }],
		producedItemId: "Amethyst Fiber",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Refining Unit",
		ingredients: [{ count: 1, itemId: "Ferrium Ore" }],
		producedItemId: "Ferrium",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Refining Unit",
		ingredients: [{ count: 1, itemId: "Ferrium Powder" }],
		producedItemId: "Ferrium",
		producedCount: 1,
		processingTime: 2,
	},

	{
		machineId: "Shredding Unit",
		ingredients: [{ count: 1, itemId: "Originium Ore" }],
		producedItemId: "Originium Powder",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Shredding Unit",
		ingredients: [{ count: 1, itemId: "Origocrust" }],
		producedItemId: "Origocrust Powder",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Shredding Unit",
		ingredients: [{ count: 1, itemId: "Amethyst Fiber" }],
		producedItemId: "Amethyst Powder",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Shredding Unit",
		ingredients: [{ count: 1, itemId: "Ferrium" }],
		producedItemId: "Ferrium Powder",
		producedCount: 1,
		processingTime: 2,
	},

	{
		machineId: "Moulding Unit",
		ingredients: [{ count: 2, itemId: "Amethyst Fiber" }],
		producedItemId: "Amethyst Bottle",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Moulding Unit",
		ingredients: [{ count: 2, itemId: "Ferrium" }],
		producedItemId: "Ferrium Bottle",
		producedCount: 1,
		processingTime: 2,
	},

	{
		machineId: "Fitting Unit",
		ingredients: [{ count: 1, itemId: "Amethyst Fiber" }],
		producedItemId: "Amethyst Part",
		producedCount: 1,
		processingTime: 2,
	},
	{
		machineId: "Fitting Unit",
		ingredients: [{ count: 1, itemId: "Ferrium" }],
		producedItemId: "Ferrium Part",
		producedCount: 1,
		processingTime: 2,
	},

	{
		machineId: "Gearing Unit",
		ingredients: [
			{ count: 5, itemId: "Origocrust" },
			{ count: 5, itemId: "Amethyst Fiber" },
		],
		producedItemId: "Amethyst Component",
		producedCount: 1,
		processingTime: 10,
	},
	{
		machineId: "Gearing Unit",
		ingredients: [
			{ count: 10, itemId: "Origocrust" },
			{ count: 10, itemId: "Ferrium" },
		],
		producedItemId: "Ferrium Component",
		producedCount: 1,
		processingTime: 10,
	},

	{
		machineId: "Packaging Unit",
		ingredients: [
			{ count: 5, itemId: "Amethyst Part" },
			{ count: 10, itemId: "Originium Powder" },
		],
		producedItemId: "LC Valley Battery",
		producedCount: 1,
		processingTime: 10,
	},
	{
		machineId: "Packaging Unit",
		ingredients: [
			{ count: 10, itemId: "Ferrium Part" },
			{ count: 15, itemId: "Originium Powder" },
		],
		producedItemId: "SC Valley Battery",
		producedCount: 1,
		processingTime: 10,
	},
] as const satisfies readonly Recipe[];
