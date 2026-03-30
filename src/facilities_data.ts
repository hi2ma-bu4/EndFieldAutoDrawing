export type Direction = "top" | "bottom" | "left" | "right";
export type Rotation = 0 | 90 | 180 | 270;

type MachineBase = {
	id: string;
	name: string;
	w: number;
	h: number;
	inputs: readonly Port[];
	outputs: readonly Port[];
	powerRequired: number;
};

export interface Machine {
	id: MachineId; // 機械名称(英語)
	name: string; // 機械名称
	w: number; // 横幅
	h: number; // 縦幅
	inputs: readonly Port[]; // 入力ポート
	outputs: readonly Port[]; // 出力ポート
	powerRequired: number; // 必要電力量
}

export interface ConveyorConnection {
	from: Direction;
	to: Direction;
}

type ConveyorBase = {
	id: string;
	name: string;
	w: number;
	h: number;
	patterns: readonly (readonly ConveyorConnection[])[];
};

export interface Conveyor {
	id: ConveyorId;
	name: string;
	w: number;
	h: number;
	patterns: readonly (readonly ConveyorConnection[])[]; // 可能な搬送パターンの配列
}

type PowerLineBase = {
	id: string;
	name: string;
	w: number;
	h: number;
	inradius: number;
};

export interface PowerLine {
	id: PowerLineId; // 伝送線名称(英語)
	name: string; // 伝送線名称
	w: number; // 本体w
	h: number; // 本体h
	inradius: number; // 影響範囲
}

export type PlacementRestriction =
	| "agreement_core" // メイン端末(設置数固定1,絶対設置)
	| "warehouse_link_hub_side" // 倉庫連結ハブの側面にのみ設置可能
	| "free"; // 自由設置可能

export interface Port {
	side: Direction; // 面
	position: number; // 位置 (0からw-1 or h-1)
	type?: string; // 入出力分類 (A, B, C, etc.)
}

type WarehouseBase = {
	id: string;
	name: string;
	w: number;
	h: number;
	inputs: readonly Port[];
	outputs: readonly Port[];
	powerRequired: number;
	restriction: PlacementRestriction;
};

export interface Warehouse {
	id: WarehouseId;
	name: string;
	w: number;
	h: number;
	inputs: readonly Port[];
	outputs: readonly Port[];
	powerRequired: number;
	restriction: PlacementRestriction;
}

const createSidePorts = (w: number, h: number, sides: Direction[]): Port[] => {
	const ports: Port[] = [];
	for (const side of sides) {
		const count = side === "top" || side === "bottom" ? w : h;
		for (let i = 0; i < count; i++) {
			ports.push({ side, position: i });
		}
	}
	return ports;
};

export const MACHINES = [
	{
		id: "Refining Unit",
		name: "製錬炉",
		w: 3,
		h: 3,
		inputs: createSidePorts(3, 3, ["top"]),
		outputs: createSidePorts(3, 3, ["bottom"]),
		powerRequired: 5,
	},
	{
		id: "Shredding Unit",
		name: "粉砕機",
		w: 3,
		h: 3,
		inputs: createSidePorts(3, 3, ["top"]),
		outputs: createSidePorts(3, 3, ["bottom"]),
		powerRequired: 5,
	},
	{
		id: "Moulding Unit",
		name: "成形機",
		w: 3,
		h: 3,
		inputs: createSidePorts(3, 3, ["top"]),
		outputs: createSidePorts(3, 3, ["bottom"]),
		powerRequired: 10,
	},
	{
		id: "Fitting Unit",
		name: "組立機",
		w: 3,
		h: 3,
		inputs: createSidePorts(3, 3, ["top"]),
		outputs: createSidePorts(3, 3, ["bottom"]),
		powerRequired: 20,
	},
	{
		id: "Gearing Unit",
		name: "装備部品加工機",
		w: 6,
		h: 4,
		inputs: createSidePorts(6, 4, ["top"]),
		outputs: createSidePorts(6, 4, ["bottom"]),
		powerRequired: 10,
	},
	{
		id: "Filling Unit",
		name: "充填機",
		w: 6,
		h: 4,
		inputs: createSidePorts(6, 4, ["top"]),
		outputs: createSidePorts(6, 4, ["bottom"]),
		powerRequired: 20,
	},
	{
		id: "Packaging Unit",
		name: "包装機",
		w: 6,
		h: 4,
		inputs: createSidePorts(6, 4, ["top"]),
		outputs: createSidePorts(6, 4, ["bottom"]),
		powerRequired: 20,
	},
	{
		id: "Seed-Picking Unit",
		name: "採種機",
		w: 5,
		h: 5,
		inputs: createSidePorts(5, 5, ["top"]),
		outputs: createSidePorts(5, 5, ["bottom"]),
		powerRequired: 10,
	},
	{
		id: "Planting Unit",
		name: "栽培機",
		w: 5,
		h: 5,
		inputs: createSidePorts(5, 5, ["top"]),
		outputs: createSidePorts(5, 5, ["bottom"]),
		powerRequired: 20,
	},
] as const satisfies readonly MachineBase[];

export type MachineId = (typeof MACHINES)[number]["id"];

export const CONVEYORS = [
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
] as const satisfies readonly ConveyorBase[];

export type ConveyorId = (typeof CONVEYORS)[number]["id"];

export const POWER_LINES = [
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
] as const satisfies readonly PowerLineBase[];

export type PowerLineId = (typeof POWER_LINES)[number]["id"];

export const WAREHOUSES = [
	{
		id: "Agreement Core",
		name: "協約核心",
		w: 9,
		h: 9,
		inputs: [
			{ side: "top", position: 1 },
			{ side: "top", position: 2 },
			{ side: "top", position: 3 },
			{ side: "top", position: 4 },
			{ side: "top", position: 5 },
			{ side: "top", position: 6 },
			{ side: "top", position: 7 },
			{ side: "bottom", position: 1 },
			{ side: "bottom", position: 2 },
			{ side: "bottom", position: 3 },
			{ side: "bottom", position: 4 },
			{ side: "bottom", position: 5 },
			{ side: "bottom", position: 6 },
			{ side: "bottom", position: 7 },
		],
		outputs: [
			{ side: "left", position: 1 },
			{ side: "left", position: 4 },
			{ side: "left", position: 7 },
			{ side: "right", position: 1 },
			{ side: "right", position: 4 },
			{ side: "right", position: 7 },
		],
		powerRequired: 0,
		restriction: "agreement_core",
	},
	{
		id: "Depot Unloader",
		name: "倉庫搬出口",
		w: 3,
		h: 1,
		inputs: [],
		outputs: [{ side: "bottom", position: 1 }],
		powerRequired: 0,
		restriction: "warehouse_link_hub_side",
	},
	{
		id: "Depot Loader",
		name: "倉庫搬入口",
		w: 3,
		h: 1,
		inputs: [{ side: "bottom", position: 1 }],
		outputs: [],
		powerRequired: 0,
		restriction: "warehouse_link_hub_side",
	},
	{
		id: "Protocol Stash",
		name: "協約貯蔵箱",
		w: 3,
		h: 3,
		inputs: [
			{ side: "top", position: 0, type: "A" },
			{ side: "top", position: 1, type: "A" },
			{ side: "top", position: 2, type: "A" },
		],
		outputs: [
			{ side: "bottom", position: 0, type: "A" },
			{ side: "bottom", position: 1, type: "A" },
			{ side: "bottom", position: 2, type: "A" },
		],
		powerRequired: 5,
		restriction: "free",
	},
] as const satisfies readonly WarehouseBase[];

export type WarehouseId = (typeof WAREHOUSES)[number]["id"];

export type Facility = Machine | Conveyor | PowerLine | Warehouse;

export interface PlacedFacility {
	facility: Facility;
	x: number;
	y: number;
	rotation: Rotation;
	conveyorPatternIndex?: number;
}
