/*!
 * index 0.0.1
 * Copyright 2026 hi2ma-bu4
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// src/facilities_data.ts
var MACHINES = [
  {
    id: "Refining Unit",
    name: "\u88FD\u932C\u7089",
    w: 3,
    h: 3,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 5
  },
  {
    id: "Shredding Unit",
    name: "\u7C89\u7815\u6A5F",
    w: 3,
    h: 3,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 5
  },
  {
    id: "Moulding Unit",
    name: "\u6210\u5F62\u6A5F",
    w: 3,
    h: 3,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 10
  },
  {
    id: "Fitting Unit",
    name: "\u7D44\u7ACB\u6A5F",
    w: 3,
    h: 3,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 20
  },
  {
    id: "Gearing Unit",
    name: "\u88C5\u5099\u90E8\u54C1\u52A0\u5DE5\u6A5F",
    w: 6,
    h: 4,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 10
  },
  {
    id: "Filling Unit",
    name: "\u5145\u586B\u6A5F",
    w: 6,
    h: 4,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 20
  },
  {
    id: "Packaging Unit",
    name: "\u5305\u88C5\u6A5F",
    w: 6,
    h: 4,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 20
  },
  {
    id: "Seed-Picking Unit",
    name: "\u63A1\u7A2E\u6A5F",
    w: 5,
    h: 5,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 10
  },
  {
    id: "Planting Unit",
    name: "\u683D\u57F9\u6A5F",
    w: 5,
    h: 5,
    inputSides: ["top"],
    outputSides: ["bottom"],
    powerRequired: 20
  }
];
var CONVEYORS = [
  {
    id: "Belt Conveyor",
    name: "\u30D9\u30EB\u30C8\u30B3\u30F3\u30D9\u30A2",
    w: 1,
    h: 1,
    patterns: [
      [{ from: "bottom", to: "top" }],
      // 直進
      [{ from: "bottom", to: "right" }],
      // 右折
      [{ from: "bottom", to: "left" }]
      // 左折
    ]
  },
  {
    id: "Belt Bridge",
    name: "\u30D9\u30EB\u30C8\u30D6\u30EA\u30C3\u30B8",
    w: 1,
    h: 1,
    patterns: [
      [
        { from: "bottom", to: "top" },
        { from: "left", to: "right" }
      ]
    ]
  },
  {
    id: "Splitter",
    name: "\u5206\u6D41\u5668",
    w: 1,
    h: 1,
    patterns: [
      [
        { from: "bottom", to: "top" },
        { from: "bottom", to: "left" },
        { from: "bottom", to: "right" }
      ]
    ]
  },
  {
    id: "Converger",
    name: "\u5408\u6D41\u5668",
    w: 1,
    h: 1,
    patterns: [
      [
        { from: "bottom", to: "top" },
        { from: "left", to: "top" },
        { from: "right", to: "top" }
      ]
    ]
  }
];
var POWER_LINES = [
  {
    id: "Relay Tower",
    name: "\u4E2D\u7D99\u30BF\u30EF\u30FC",
    w: 3,
    h: 3,
    inradius: 2
  },
  {
    id: "Electric Pylon",
    name: "\u9001\u96FB\u30B9\u30BF\u30F3\u30C9",
    w: 2,
    h: 2,
    inradius: 5
  }
];
var WAREHOUSES = [
  {
    id: "Agreement Core",
    name: "\u5354\u7D04\u6838\u5FC3",
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
      { side: "bottom", position: 7 }
    ],
    outputs: [
      { side: "left", position: 1 },
      { side: "left", position: 4 },
      { side: "left", position: 7 },
      { side: "right", position: 1 },
      { side: "right", position: 4 },
      { side: "right", position: 7 }
    ],
    powerRequired: 0,
    restriction: "agreement_core"
  },
  {
    id: "Depot Unloader",
    name: "\u5009\u5EAB\u642C\u51FA\u53E3",
    w: 3,
    h: 1,
    inputs: [],
    outputs: [{ side: "bottom", position: 1 }],
    powerRequired: 0,
    restriction: "warehouse_link_hub_side"
  },
  {
    id: "Depot Loader",
    name: "\u5009\u5EAB\u642C\u5165\u53E3",
    w: 3,
    h: 1,
    inputs: [{ side: "bottom", position: 1 }],
    outputs: [],
    powerRequired: 0,
    restriction: "warehouse_link_hub_side"
  },
  {
    id: "Protocol Stash",
    name: "\u5354\u7D04\u8CAF\u8535\u7BB1",
    w: 3,
    h: 3,
    inputs: [
      { side: "top", position: 0, type: "A" },
      { side: "top", position: 1, type: "A" },
      { side: "top", position: 2, type: "A" }
    ],
    outputs: [
      { side: "bottom", position: 0, type: "A" },
      { side: "bottom", position: 1, type: "A" },
      { side: "bottom", position: 2, type: "A" }
    ],
    powerRequired: 5,
    restriction: "free"
  }
];

// src/item_data.ts
var ITEMS = [
  { id: "Originium Ore", name: "\u6E90\u77F3\u9271\u7269" },
  { id: "Amethyst Ore", name: "\u7D2B\u6676\u9271\u7269" },
  { id: "Ferrium Ore", name: "\u9752\u9244\u9271\u7269" },
  { id: "Origocrust", name: "\u7D50\u6676\u5916\u6BBB" },
  { id: "Amethyst Fiber", name: "\u7D2B\u6676\u7E4A\u7DAD" },
  { id: "Ferrium", name: "\u9752\u9244\u584A" },
  { id: "Originium Powder", name: "\u6E90\u77F3\u7C89\u672B" },
  { id: "Origocrust Powder", name: "\u7D50\u6676\u5916\u6BBB\u7C89\u672B" },
  { id: "Amethyst Powder", name: "\u7D2B\u6676\u7C89\u672B" },
  { id: "Ferrium Powder", name: "\u9752\u9244\u7C89\u672B" },
  { id: "Amethyst Bottle", name: "\u7D2B\u6676\u88FD\u30DC\u30C8\u30EB" },
  { id: "Ferrium Bottle", name: "\u9752\u9244\u88FD\u30DC\u30C8\u30EB" },
  { id: "Amethyst Part", name: "\u7D2B\u6676\u90E8\u54C1" },
  { id: "Ferrium Part", name: "\u9244\u88FD\u90E8\u54C1" },
  { id: "Amethyst Component", name: "\u7D2B\u6676\u88C5\u5099\u90E8\u54C1" },
  { id: "Ferrium Component", name: "\u9752\u9244\u88C5\u5099\u90E8\u54C1" },
  { id: "LC Valley Battery", name: "\u5C0F\u5BB9\u91CF\u8C37\u5730\u30D0\u30C3\u30C6\u30EA\u30FC" },
  { id: "SC Valley Battery", name: "\u4E2D\u5BB9\u91CF\u8C37\u5730\u30D0\u30C3\u30C6\u30EA\u30FC" }
];

// src/recipe_data.ts
var RECIPES = [
  {
    machineId: "Refining Unit",
    ingredients: [{ count: 1, itemId: "Originium Ore" }],
    producedItemId: "Origocrust",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Refining Unit",
    ingredients: [{ count: 1, itemId: "Originium Powder" }],
    producedItemId: "Origocrust Powder",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Refining Unit",
    ingredients: [{ count: 1, itemId: "Origocrust Powder" }],
    producedItemId: "Origocrust",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Refining Unit",
    ingredients: [{ count: 1, itemId: "Amethyst Ore" }],
    producedItemId: "Amethyst Fiber",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Refining Unit",
    ingredients: [{ count: 1, itemId: "Amethyst Powder" }],
    producedItemId: "Amethyst Fiber",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Refining Unit",
    ingredients: [{ count: 1, itemId: "Ferrium Ore" }],
    producedItemId: "Ferrium",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Refining Unit",
    ingredients: [{ count: 1, itemId: "Ferrium Powder" }],
    producedItemId: "Ferrium",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Shredding Unit",
    ingredients: [{ count: 1, itemId: "Originium Ore" }],
    producedItemId: "Originium Powder",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Shredding Unit",
    ingredients: [{ count: 1, itemId: "Origocrust" }],
    producedItemId: "Origocrust Powder",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Shredding Unit",
    ingredients: [{ count: 1, itemId: "Amethyst Fiber" }],
    producedItemId: "Amethyst Powder",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Shredding Unit",
    ingredients: [{ count: 1, itemId: "Ferrium" }],
    producedItemId: "Ferrium Powder",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Moulding Unit",
    ingredients: [{ count: 2, itemId: "Amethyst Fiber" }],
    producedItemId: "Amethyst Bottle",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Moulding Unit",
    ingredients: [{ count: 2, itemId: "Ferrium" }],
    producedItemId: "Ferrium Bottle",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Fitting Unit",
    ingredients: [{ count: 1, itemId: "Amethyst Fiber" }],
    producedItemId: "Amethyst Part",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Fitting Unit",
    ingredients: [{ count: 1, itemId: "Ferrium" }],
    producedItemId: "Ferrium Part",
    producedCount: 1,
    processingTime: 2
  },
  {
    machineId: "Gearing Unit",
    ingredients: [
      { count: 5, itemId: "Origocrust" },
      { count: 5, itemId: "Amethyst Fiber" }
    ],
    producedItemId: "Amethyst Component",
    producedCount: 1,
    processingTime: 10
  },
  {
    machineId: "Gearing Unit",
    ingredients: [
      { count: 10, itemId: "Origocrust" },
      { count: 10, itemId: "Ferrium" }
    ],
    producedItemId: "Ferrium Component",
    producedCount: 1,
    processingTime: 10
  },
  {
    machineId: "Packaging Unit",
    ingredients: [
      { count: 5, itemId: "Amethyst Part" },
      { count: 10, itemId: "Originium Powder" }
    ],
    producedItemId: "LC Valley Battery",
    producedCount: 1,
    processingTime: 10
  },
  {
    machineId: "Packaging Unit",
    ingredients: [
      { count: 10, itemId: "Ferrium Part" },
      { count: 15, itemId: "Originium Powder" }
    ],
    producedItemId: "SC Valley Battery",
    producedCount: 1,
    processingTime: 10
  }
];

// src/index.ts
var MapRenderer = class {
  canvas;
  ctx;
  width;
  height;
  cellSize = 20;
  constructor(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.canvas.width = width * this.cellSize;
    this.canvas.height = height * this.cellSize;
  }
  drawGrid() {
    this.ctx.strokeStyle = "#ccc";
    for (let i = 0; i <= this.width; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.cellSize, 0);
      this.ctx.lineTo(i * this.cellSize, this.height * this.cellSize);
      this.ctx.stroke();
    }
    for (let j = 0; j <= this.height; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, j * this.cellSize);
      this.ctx.lineTo(this.width * this.cellSize, j * this.cellSize);
      this.ctx.stroke();
    }
  }
  drawMachine(x, y, machine) {
    this.ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, machine.w * this.cellSize, machine.h * this.cellSize);
    this.ctx.fillStyle = "black";
    this.ctx.fillText(machine.name, x * this.cellSize + 2, y * this.cellSize + 12);
  }
  drawConveyor(x, y, conveyor, patternIndex = 0) {
    this.ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, conveyor.w * this.cellSize, conveyor.h * this.cellSize);
    const pattern = conveyor.patterns[patternIndex] || conveyor.patterns[0];
    if (!pattern) return;
    this.ctx.strokeStyle = "rgba(0, 100, 0, 0.8)";
    this.ctx.lineWidth = 2;
    for (const conn of pattern) {
      const start = this.getSideCenter(x, y, conveyor.w, conveyor.h, conn.from);
      const end = this.getSideCenter(x, y, conveyor.w, conveyor.h, conn.to);
      this.ctx.beginPath();
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.stroke();
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      this.ctx.beginPath();
      this.ctx.moveTo(end.x, end.y);
      this.ctx.lineTo(end.x - 5 * Math.cos(angle - Math.PI / 6), end.y - 5 * Math.sin(angle - Math.PI / 6));
      this.ctx.moveTo(end.x, end.y);
      this.ctx.lineTo(end.x - 5 * Math.cos(angle + Math.PI / 6), end.y - 5 * Math.sin(angle + Math.PI / 6));
      this.ctx.stroke();
    }
  }
  getSideCenter(x, y, w, h, side) {
    let cx = (x + w / 2) * this.cellSize;
    let cy = (y + h / 2) * this.cellSize;
    if (side === "top") cy = y * this.cellSize;
    if (side === "bottom") cy = (y + h) * this.cellSize;
    if (side === "left") cx = x * this.cellSize;
    if (side === "right") cx = (x + w) * this.cellSize;
    return { x: cx, y: cy };
  }
  drawPowerLine(x, y, powerLine) {
    this.ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, powerLine.w * this.cellSize, powerLine.h * this.cellSize);
    const rangeX = (x - powerLine.inradius) * this.cellSize;
    const rangeY = (y - powerLine.inradius) * this.cellSize;
    const rangeW = (powerLine.w + 2 * powerLine.inradius) * this.cellSize;
    const rangeH = (powerLine.h + 2 * powerLine.inradius) * this.cellSize;
    this.ctx.strokeStyle = "rgba(255, 255, 0, 0.3)";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(rangeX, rangeY, rangeW, rangeH);
  }
  drawWarehouse(x, y, warehouse) {
    this.ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, warehouse.w * this.cellSize, warehouse.h * this.cellSize);
    this.ctx.fillStyle = "black";
    this.ctx.fillText(warehouse.name, x * this.cellSize + 2, y * this.cellSize + 12);
    this.ctx.fillStyle = "blue";
    for (const port of warehouse.inputs) {
      const pos = this.getPortPosition(x, y, warehouse.w, warehouse.h, port);
      this.ctx.fillRect(pos.x - 2, pos.y - 2, 4, 4);
    }
    this.ctx.fillStyle = "red";
    for (const port of warehouse.outputs) {
      const pos = this.getPortPosition(x, y, warehouse.w, warehouse.h, port);
      this.ctx.fillRect(pos.x - 2, pos.y - 2, 4, 4);
    }
  }
  getPortPosition(x, y, w, h, port) {
    let px = x * this.cellSize;
    let py = y * this.cellSize;
    if (port.side === "top") {
      px += (port.position + 0.5) * this.cellSize;
    } else if (port.side === "bottom") {
      px += (port.position + 0.5) * this.cellSize;
      py += h * this.cellSize;
    } else if (port.side === "left") {
      py += (port.position + 0.5) * this.cellSize;
    } else if (port.side === "right") {
      px += w * this.cellSize;
      py += (port.position + 0.5) * this.cellSize;
    }
    return { x: px, y: py };
  }
};
window.onload = () => {
  const renderer = new MapRenderer("mapCanvas", 40, 40);
  renderer.drawGrid();
  renderer.drawMachine(5, 5, MACHINES[0]);
  renderer.drawMachine(10, 5, MACHINES[1]);
  renderer.drawConveyor(5, 10, CONVEYORS[0], 0);
  renderer.drawConveyor(7, 10, CONVEYORS[0], 1);
  renderer.drawConveyor(9, 10, CONVEYORS[0], 2);
  renderer.drawConveyor(11, 10, CONVEYORS[1]);
  renderer.drawConveyor(13, 10, CONVEYORS[2]);
  renderer.drawConveyor(15, 10, CONVEYORS[3]);
  renderer.drawPowerLine(20, 20, POWER_LINES[0]);
  renderer.drawPowerLine(35, 20, POWER_LINES[1]);
  renderer.drawWarehouse(20, 5, WAREHOUSES[0]);
  renderer.drawWarehouse(30, 5, WAREHOUSES[1]);
  renderer.drawWarehouse(30, 10, WAREHOUSES[2]);
  console.log("Items loaded:", ITEMS);
  console.log("Recipes loaded:", RECIPES);
};
//# sourceMappingURL=index.js.map
