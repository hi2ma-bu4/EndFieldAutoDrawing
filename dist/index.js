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
};
//# sourceMappingURL=index.js.map
