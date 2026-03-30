/*!
 * index 0.0.1
 * Copyright 2026 hi2ma-bu4
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// src/facilities_data.ts
var createSidePorts = (w, h, sides) => {
  const ports = [];
  for (const side of sides) {
    const count = side === "top" || side === "bottom" ? w : h;
    for (let i = 0; i < count; i++) {
      ports.push({ side, position: i });
    }
  }
  return ports;
};
var MACHINES = [
  {
    id: "Refining Unit",
    name: "\u88FD\u932C\u7089",
    w: 3,
    h: 3,
    inputs: createSidePorts(3, 3, ["top"]),
    outputs: createSidePorts(3, 3, ["bottom"]),
    powerRequired: 5
  },
  {
    id: "Shredding Unit",
    name: "\u7C89\u7815\u6A5F",
    w: 3,
    h: 3,
    inputs: createSidePorts(3, 3, ["top"]),
    outputs: createSidePorts(3, 3, ["bottom"]),
    powerRequired: 5
  },
  {
    id: "Moulding Unit",
    name: "\u6210\u5F62\u6A5F",
    w: 3,
    h: 3,
    inputs: createSidePorts(3, 3, ["top"]),
    outputs: createSidePorts(3, 3, ["bottom"]),
    powerRequired: 10
  },
  {
    id: "Fitting Unit",
    name: "\u7D44\u7ACB\u6A5F",
    w: 3,
    h: 3,
    inputs: createSidePorts(3, 3, ["top"]),
    outputs: createSidePorts(3, 3, ["bottom"]),
    powerRequired: 20
  },
  {
    id: "Gearing Unit",
    name: "\u88C5\u5099\u90E8\u54C1\u52A0\u5DE5\u6A5F",
    w: 6,
    h: 4,
    inputs: createSidePorts(6, 4, ["top"]),
    outputs: createSidePorts(6, 4, ["bottom"]),
    powerRequired: 10
  },
  {
    id: "Filling Unit",
    name: "\u5145\u586B\u6A5F",
    w: 6,
    h: 4,
    inputs: createSidePorts(6, 4, ["top"]),
    outputs: createSidePorts(6, 4, ["bottom"]),
    powerRequired: 20
  },
  {
    id: "Packaging Unit",
    name: "\u5305\u88C5\u6A5F",
    w: 6,
    h: 4,
    inputs: createSidePorts(6, 4, ["top"]),
    outputs: createSidePorts(6, 4, ["bottom"]),
    powerRequired: 20
  },
  {
    id: "Seed-Picking Unit",
    name: "\u63A1\u7A2E\u6A5F",
    w: 5,
    h: 5,
    inputs: createSidePorts(5, 5, ["top"]),
    outputs: createSidePorts(5, 5, ["bottom"]),
    powerRequired: 10
  },
  {
    id: "Planting Unit",
    name: "\u683D\u57F9\u6A5F",
    w: 5,
    h: 5,
    inputs: createSidePorts(5, 5, ["top"]),
    outputs: createSidePorts(5, 5, ["bottom"]),
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

// src/utils.ts
function rotateDirection(dir, rotation) {
  const dirs = ["top", "right", "bottom", "left"];
  const idx = dirs.indexOf(dir);
  const offset = rotation / 90;
  return dirs[(idx + offset) % 4];
}
function getRotatedDimensions(w, h, rotation) {
  if (rotation === 90 || rotation === 270) {
    return { w: h, h: w };
  }
  return { w, h };
}
function rotatePort(port, w, h, rotation) {
  const rotatedSide = rotateDirection(port.side, rotation);
  let rotatedPosition = port.position;
  if (rotation === 90) {
    if (port.side === "top") rotatedPosition = port.position;
    else if (port.side === "right") rotatedPosition = h - 1 - port.position;
    else if (port.side === "bottom") rotatedPosition = port.position;
    else if (port.side === "left") rotatedPosition = h - 1 - port.position;
  } else if (rotation === 180) {
    if (port.side === "top" || port.side === "bottom") rotatedPosition = w - port.position - 1;
    else rotatedPosition = h - port.position - 1;
  } else if (rotation === 270) {
    if (port.side === "top") rotatedPosition = w - 1 - port.position;
    else if (port.side === "right") rotatedPosition = port.position;
    else if (port.side === "bottom") rotatedPosition = w - 1 - port.position;
    else if (port.side === "left") rotatedPosition = port.position;
  }
  return {
    side: rotatedSide,
    position: rotatedPosition,
    type: port.type
  };
}

// src/factory.ts
var FactoryMap = class {
  facilities = [];
  addFacility(pf) {
    this.facilities.push(pf);
  }
  getFacilities() {
    return this.facilities;
  }
  getFacilityAt(x, y) {
    return this.facilities.find((pf) => {
      const { w, h } = getRotatedDimensions(pf.facility.w, pf.facility.h, pf.rotation);
      return x >= pf.x && x < pf.x + w && y >= pf.y && y < pf.y + h;
    });
  }
  getInputs(pf) {
    const ports = [];
    const { w, h } = pf.facility;
    const { w: rw, h: rh } = getRotatedDimensions(w, h, pf.rotation);
    if ("inputs" in pf.facility) {
      for (const port of pf.facility.inputs) {
        const rport = rotatePort(port, w, h, pf.rotation);
        ports.push(this.getGlobalPort(pf.x, pf.y, rw, rh, rport.side, rport.position, rport.type));
      }
    } else if ("patterns" in pf.facility) {
      const pattern = pf.facility.patterns[pf.conveyorPatternIndex ?? 0] ?? pf.facility.patterns[0];
      for (const conn of pattern) {
        const rside = rotateDirection(conn.from, pf.rotation);
        ports.push(this.getGlobalPort(pf.x, pf.y, rw, rh, rside, 0));
      }
    }
    return ports;
  }
  getOutputs(pf) {
    const ports = [];
    const { w, h } = pf.facility;
    const { w: rw, h: rh } = getRotatedDimensions(w, h, pf.rotation);
    if ("outputs" in pf.facility) {
      for (const port of pf.facility.outputs) {
        const rport = rotatePort(port, w, h, pf.rotation);
        ports.push(this.getGlobalPort(pf.x, pf.y, rw, rh, rport.side, rport.position, rport.type));
      }
    } else if ("patterns" in pf.facility) {
      const pattern = pf.facility.patterns[pf.conveyorPatternIndex ?? 0] ?? pf.facility.patterns[0];
      for (const conn of pattern) {
        const rside = rotateDirection(conn.to, pf.rotation);
        ports.push(this.getGlobalPort(pf.x, pf.y, rw, rh, rside, 0));
      }
    }
    return ports;
  }
  getGlobalPort(x, y, rw, rh, side, pos, type) {
    let gx = x;
    let gy = y;
    if (side === "top") {
      gx += pos;
    } else if (side === "bottom") {
      gx += pos;
      gy += rh - 1;
    } else if (side === "left") {
      gy += pos;
    } else if (side === "right") {
      gx += rw - 1;
      gy += pos;
    }
    return { x: gx, y: gy, dir: side, type };
  }
  getAllPortsWithStatus() {
    const results = [];
    for (const pf of this.facilities) {
      const inputs = this.getInputs(pf);
      for (const inp of inputs) {
        const { nx, ny } = this.getNeighbor(inp.x, inp.y, inp.dir);
        const neighborPf = this.getFacilityAt(nx, ny);
        let connected = false;
        if (neighborPf) {
          const neighborOutputs = this.getOutputs(neighborPf);
          const expectedDir = this.getOpposite(inp.dir);
          connected = neighborOutputs.some((out) => out.x === nx && out.y === ny && out.dir === expectedDir);
        }
        results.push({ pf, port: inp, connected, isInput: true });
      }
      const outputs = this.getOutputs(pf);
      for (const out of outputs) {
        const { nx, ny } = this.getNeighbor(out.x, out.y, out.dir);
        const neighborPf = this.getFacilityAt(nx, ny);
        let connected = false;
        if (neighborPf) {
          const neighborInputs = this.getInputs(neighborPf);
          const expectedDir = this.getOpposite(out.dir);
          connected = neighborInputs.some((inp) => inp.x === nx && inp.y === ny && inp.dir === expectedDir);
        }
        results.push({ pf, port: out, connected, isInput: false });
      }
    }
    return results;
  }
  checkConnections() {
    const results = [];
    for (const pf of this.facilities) {
      const outputs = this.getOutputs(pf);
      for (const out of outputs) {
        const { nx, ny } = this.getNeighbor(out.x, out.y, out.dir);
        const neighborPf = this.getFacilityAt(nx, ny);
        let connected = false;
        if (neighborPf) {
          const neighborInputs = this.getInputs(neighborPf);
          const expectedDir = this.getOpposite(out.dir);
          connected = neighborInputs.some((inp) => inp.x === nx && inp.y === ny && inp.dir === expectedDir);
        }
        results.push({
          from: pf,
          port: out,
          neighbor: neighborPf,
          connected
        });
      }
    }
    return results;
  }
  getNeighbor(x, y, side) {
    if (side === "top") return { nx: x, ny: y - 1 };
    if (side === "bottom") return { nx: x, ny: y + 1 };
    if (side === "left") return { nx: x - 1, ny: y };
    return { nx: x + 1, ny: y };
  }
  getOpposite(side) {
    if (side === "top") return "bottom";
    if (side === "bottom") return "top";
    if (side === "left") return "right";
    return "left";
  }
  static getConveyorConfig(from, to) {
    const conveyor = CONVEYORS[0];
    const rotations = [0, 90, 180, 270];
    for (let r of rotations) {
      for (let i = 0; i < conveyor.patterns.length; i++) {
        const pattern = conveyor.patterns[i];
        if (pattern.length === 1) {
          const conn = pattern[0];
          if (rotateDirection(conn.from, r) === from && rotateDirection(conn.to, r) === to) {
            return { rotation: r, conveyorPatternIndex: i };
          }
        }
      }
    }
    return { rotation: 0, conveyorPatternIndex: 0 };
  }
};

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

// src/renderer.ts
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
  drawMap(map) {
    this.drawGrid();
    for (const pf of map.getFacilities()) {
      this.drawPlacedFacility(pf);
    }
    this.drawPortIndicators(map.getAllPortsWithStatus());
  }
  drawPlacedFacility(pf) {
    if ("patterns" in pf.facility) {
      this.drawConveyor(pf);
    } else if ("inradius" in pf.facility) {
      this.drawPowerLine(pf);
    } else if ("inputs" in pf.facility) {
      const isWarehouse = "restriction" in pf.facility;
      const color = isWarehouse ? "rgba(128, 128, 128, 0.5)" : "rgba(0, 0, 255, 0.5)";
      const { w, h } = getRotatedDimensions(pf.facility.w, pf.facility.h, pf.rotation);
      this.drawBaseFacility(pf.x, pf.y, w, h, color, pf.facility.name);
    }
  }
  drawBaseFacility(x, y, w, h, color, name) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, w * this.cellSize, h * this.cellSize);
    this.ctx.fillStyle = "black";
    this.ctx.font = "12px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(name, (x + w / 2) * this.cellSize, (y + h / 2) * this.cellSize);
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "alphabetic";
  }
  drawConveyor(pf) {
    const conveyor = pf.facility;
    const { w, h } = getRotatedDimensions(conveyor.w, conveyor.h, pf.rotation);
    this.ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    this.ctx.fillRect(pf.x * this.cellSize, pf.y * this.cellSize, w * this.cellSize, h * this.cellSize);
    const pattern = conveyor.patterns[pf.conveyorPatternIndex || 0] || conveyor.patterns[0];
    if (!pattern) return;
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2.5;
    for (const conn of pattern) {
      const rFrom = rotateDirection(conn.from, pf.rotation);
      const rTo = rotateDirection(conn.to, pf.rotation);
      const start = this.getSideCenter(pf.x, pf.y, w, h, rFrom);
      const end = this.getSideCenter(pf.x, pf.y, w, h, rTo);
      if (this.isOpposite(rFrom, rTo)) {
        this.drawArrow(start.x, start.y, end.x, end.y);
      } else {
        this.drawBentArrow(pf.x, pf.y, w, h, rFrom, rTo);
      }
    }
  }
  isOpposite(d1, d2) {
    if (d1 === "top") return d2 === "bottom";
    if (d1 === "bottom") return d2 === "top";
    if (d1 === "left") return d2 === "right";
    return d2 === "left";
  }
  drawArrow(sx, sy, ex, ey) {
    this.ctx.beginPath();
    this.ctx.moveTo(sx, sy);
    this.ctx.lineTo(ex, ey);
    this.ctx.stroke();
    const angle = Math.atan2(ey - sy, ex - sx);
    this.ctx.beginPath();
    this.ctx.moveTo(ex, ey);
    this.ctx.lineTo(ex - 6 * Math.cos(angle - Math.PI / 6), ey - 6 * Math.sin(angle - Math.PI / 6));
    this.ctx.moveTo(ex, ey);
    this.ctx.lineTo(ex - 6 * Math.cos(angle + Math.PI / 6), ey - 6 * Math.sin(angle + Math.PI / 6));
    this.ctx.stroke();
  }
  drawBentArrow(x, y, w, h, from, to) {
    const start = this.getSideCenter(x, y, w, h, from);
    const end = this.getSideCenter(x, y, w, h, to);
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    this.ctx.beginPath();
    this.ctx.moveTo(end.x, end.y);
    this.ctx.lineTo(end.x - 6 * Math.cos(angle - Math.PI / 6), end.y - 6 * Math.sin(angle - Math.PI / 6));
    this.ctx.moveTo(end.x, end.y);
    this.ctx.lineTo(end.x - 6 * Math.cos(angle + Math.PI / 6), end.y - 6 * Math.sin(angle + Math.PI / 6));
    this.ctx.stroke();
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
  drawPowerLine(pf) {
    const powerLine = pf.facility;
    const { w, h } = getRotatedDimensions(powerLine.w, powerLine.h, pf.rotation);
    this.ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
    this.ctx.fillRect(pf.x * this.cellSize, pf.y * this.cellSize, w * this.cellSize, h * this.cellSize);
    const rangeX = (pf.x - powerLine.inradius) * this.cellSize;
    const rangeY = (pf.y - powerLine.inradius) * this.cellSize;
    const rangeW = (w + 2 * powerLine.inradius) * this.cellSize;
    const rangeH = (h + 2 * powerLine.inradius) * this.cellSize;
    this.ctx.strokeStyle = "rgba(255, 255, 0, 0.3)";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(rangeX, rangeY, rangeW, rangeH);
  }
  drawWarehouse(pf) {
  }
  drawPortIndicators(ports) {
    const connectedProcessed = /* @__PURE__ */ new Set();
    for (const { pf, port, connected, isInput } of ports) {
      if ("patterns" in pf.facility || "inradius" in pf.facility) continue;
      if (connected) {
        const boundaryKey = this.getBoundaryKey(port.x, port.y, port.dir);
        if (connectedProcessed.has(boundaryKey)) continue;
        connectedProcessed.add(boundaryKey);
        const pos = this.getGridBoundaryPosition(port.x, port.y, port.dir);
        this.ctx.fillStyle = "lime";
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        const pos = this.getInsidePortPosition(port.x, port.y, port.dir);
        this.ctx.lineWidth = 1;
        if (isInput) {
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(pos.x - 2, pos.y - 2, 4, 4);
        } else {
          this.ctx.fillStyle = "red";
          this.ctx.beginPath();
          this.ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }
  getBoundaryKey(x, y, side) {
    let gx = x, gy = y, dir = side;
    if (side === "bottom") {
      gy += 1;
      dir = "top";
    }
    if (side === "right") {
      gx += 1;
      dir = "left";
    }
    return `${gx},${gy},${dir}`;
  }
  getGridBoundaryPosition(gx, gy, side) {
    let px = gx * this.cellSize;
    let py = gy * this.cellSize;
    if (side === "top") px += 0.5 * this.cellSize;
    else if (side === "bottom") {
      px += 0.5 * this.cellSize;
      py += 1 * this.cellSize;
    } else if (side === "left") py += 0.5 * this.cellSize;
    else if (side === "right") {
      px += 1 * this.cellSize;
      py += 0.5 * this.cellSize;
    }
    return { x: px, y: py };
  }
  getInsidePortPosition(gx, gy, side) {
    let px = gx * this.cellSize;
    let py = gy * this.cellSize;
    const offset = 4;
    if (side === "top") {
      px += 0.5 * this.cellSize;
      py += offset;
    } else if (side === "bottom") {
      px += 0.5 * this.cellSize;
      py += 1 * this.cellSize - offset;
    } else if (side === "left") {
      px += offset;
      py += 0.5 * this.cellSize;
    } else if (side === "right") {
      px += 1 * this.cellSize - offset;
      py += 0.5 * this.cellSize;
    }
    return { x: px, y: py };
  }
};

// src/index.ts
window.onload = () => {
  const renderer = new MapRenderer("mapCanvas", 40, 40);
  const map = new FactoryMap();
  const machine1 = { facility: MACHINES[0], x: 10, y: 5, rotation: 0 };
  map.addFacility(machine1);
  const c1 = FactoryMap.getConveyorConfig("top", "bottom");
  const conv1 = { facility: CONVEYORS[0], x: 11, y: 8, ...c1 };
  map.addFacility(conv1);
  const c2 = FactoryMap.getConveyorConfig("top", "right");
  const conv2 = { facility: CONVEYORS[0], x: 11, y: 9, ...c2 };
  map.addFacility(conv2);
  const c3 = FactoryMap.getConveyorConfig("left", "right");
  const conv3 = { facility: CONVEYORS[0], x: 12, y: 9, ...c3 };
  map.addFacility(conv3);
  const c4 = FactoryMap.getConveyorConfig("left", "top");
  const conv4 = { facility: CONVEYORS[0], x: 13, y: 9, ...c4 };
  map.addFacility(conv4);
  const c5 = FactoryMap.getConveyorConfig("bottom", "right");
  const conv5 = { facility: CONVEYORS[0], x: 13, y: 7, ...c5 };
  map.addFacility(conv5);
  const c6 = FactoryMap.getConveyorConfig("bottom", "top");
  const conv6 = { facility: CONVEYORS[0], x: 13, y: 8, ...c6 };
  map.addFacility(conv6);
  const wh1 = { facility: WAREHOUSES[3], x: 20, y: 5, rotation: 0 };
  map.addFacility(wh1);
  renderer.drawMap(map);
  console.log("Items loaded:", ITEMS);
  console.log("Recipes loaded:", RECIPES);
};
//# sourceMappingURL=index.js.map
