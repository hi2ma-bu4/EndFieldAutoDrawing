export type Direction = "top" | "bottom" | "left" | "right";

export interface Machine {
	id: string; // 機械名称(英語)
	name: string; // 機械名称
	w: number; // 横幅
	h: number; // 縦幅
	inputSides: Direction[]; // 入力辺
	outputSides: Direction[]; // 出力辺
	powerRequired: number; // 必要電力量
}

export interface ConveyorConnection {
	from: Direction;
	to: Direction;
}

export interface Conveyor {
	id: string;
	name: string;
	w: number;
	h: number;
	patterns: ConveyorConnection[][]; // 可能な搬送パターンの配列
}

export interface PowerLine {
	id: string; // 伝送線名称(英語)
	name: string; // 伝送線名称
	w: number; // 本体w
	h: number; // 本体h
	inradius: number; // 影響範囲
}

export const MACHINES: Machine[] = [
	{
		id: "Refining Unit",
		name: "製錬炉",
		w: 3,
		h: 3,
		inputSides: ["top"],
		outputSides: ["bottom"],
		powerRequired: 5,
	},
	{
		id: "Shredding Unit",
		name: "粉砕機",
		w: 3,
		h: 3,
		inputSides: ["top"],
		outputSides: ["bottom"],
		powerRequired: 5,
	},
	{
		id: "Moulding Unit",
		name: "成形機",
		w: 3,
		h: 3,
		inputSides: ["top"],
		outputSides: ["bottom"],
		powerRequired: 10,
	},
	{
		id: "Fitting Unit",
		name: "組立機",
		w: 3,
		h: 3,
		inputSides: ["top"],
		outputSides: ["bottom"],
		powerRequired: 20,
	},
	{
		id: "Gearing Unit",
		name: "装備部品加工機",
		w: 6,
		h: 4,
		inputSides: ["top"],
		outputSides: ["bottom"],
		powerRequired: 10,
	},
	{
		id: "Filling Unit",
		name: "充填機",
		w: 6,
		h: 4,
		inputSides: ["top"],
		outputSides: ["bottom"],
		powerRequired: 20,
	},
	{
		id: "Seed-Picking Unit",
		name: "採種機",
		w: 5,
		h: 5,
		inputSides: ["top"],
		outputSides: ["bottom"],
		powerRequired: 10,
	},
	{
		id: "Planting Unit",
		name: "栽培機",
		w: 5,
		h: 5,
		inputSides: ["top"],
		outputSides: ["bottom"],
		powerRequired: 20,
	},
];

export const CONVEYORS: Conveyor[] = [
	{
		id: "Belt Conveyor",
		name: "ベルトコンベア",
		w: 1,
		h: 1,
		patterns: [
			[{ from: "bottom", to: "top" }], // 直進
			[{ from: "bottom", to: "right" }], // 右折
			[{ from: "bottom", to: "left" }], // 左折
		],
	},
	{
		id: "Belt Bridge",
		name: "ベルトブリッジ",
		w: 1,
		h: 1,
		patterns: [
			[
				{ from: "bottom", to: "top" },
				{ from: "left", to: "right" },
			],
		],
	},
	{
		id: "Splitter",
		name: "分流器",
		w: 1,
		h: 1,
		patterns: [
			[
				{ from: "bottom", to: "top" },
				{ from: "bottom", to: "left" },
				{ from: "bottom", to: "right" },
			],
		],
	},
	{
		id: "Converger",
		name: "合流器",
		w: 1,
		h: 1,
		patterns: [
			[
				{ from: "bottom", to: "top" },
				{ from: "left", to: "top" },
				{ from: "right", to: "top" },
			],
		],
	},
];

export const POWER_LINES: PowerLine[] = [
	{
		id: "Relay Tower",
		name: "中継タワー",
		w: 3,
		h: 3,
		inradius: 2,
	},
	{
		id: "Electric Pylon",
		name: "送電スタンド",
		w: 2,
		h: 2,
		inradius: 5,
	},
];
