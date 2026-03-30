import { type Conveyor, type Direction, type PlacedFacility, type PowerLine } from "./facilities_data";
import { type FactoryMap, type GlobalPort } from "./factory";
import { getRotatedDimensions, rotateDirection } from "./utils";

export class MapRenderer {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private width: number;
	private height: number;
	private cellSize: number = 20;

	constructor(canvasId: string, width: number, height: number) {
		this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		this.ctx = this.canvas.getContext("2d")!;
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

	drawMap(map: FactoryMap) {
		this.drawGrid();
		for (const pf of map.getFacilities()) {
			this.drawPlacedFacility(pf);
		}
		this.drawPortIndicators(map.getAllPortsWithStatus());
	}

	drawPlacedFacility(pf: PlacedFacility) {
		if ("patterns" in pf.facility) {
			this.drawConveyor(pf);
		} else if ("inradius" in pf.facility) {
			this.drawPowerLine(pf);
		} else if ("inputs" in pf.facility) {
			// Both Machines and Warehouses have inputs/outputs
			const isWarehouse = "restriction" in pf.facility;
			const color = isWarehouse ? "rgba(128, 128, 128, 0.5)" : "rgba(0, 0, 255, 0.5)";
			const { w, h } = getRotatedDimensions(pf.facility.w, pf.facility.h, pf.rotation);
			this.drawBaseFacility(pf.x, pf.y, w, h, color, pf.facility.name);
		}
	}

	private drawBaseFacility(x: number, y: number, w: number, h: number, color: string, name: string) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * this.cellSize, y * this.cellSize, w * this.cellSize, h * this.cellSize);
		this.ctx.fillStyle = "black";
		this.ctx.font = "12px sans-serif";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(name, (x + w / 2) * this.cellSize, (y + h / 2) * this.cellSize);
		// Reset alignment
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "alphabetic";
	}

	private drawConveyor(pf: PlacedFacility) {
		const conveyor = pf.facility as Conveyor;
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
				// Straight
				this.drawArrow(start.x, start.y, end.x, end.y);
			} else {
				// Corner
				this.drawBentArrow(pf.x, pf.y, w, h, rFrom, rTo);
			}
		}
	}

	private isOpposite(d1: Direction, d2: Direction): boolean {
		if (d1 === "top") return d2 === "bottom";
		if (d1 === "bottom") return d2 === "top";
		if (d1 === "left") return d2 === "right";
		return d2 === "left";
	}

	private drawArrow(sx: number, sy: number, ex: number, ey: number) {
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

	private drawBentArrow(x: number, y: number, w: number, h: number, from: Direction, to: Direction) {
		const start = this.getSideCenter(x, y, w, h, from);
		const end = this.getSideCenter(x, y, w, h, to);

		// Single diagonal arrow for corners as requested ("↘", "↗")
		this.ctx.beginPath();
		this.ctx.moveTo(start.x, start.y);
		this.ctx.lineTo(end.x, end.y);
		this.ctx.stroke();

		// Arrow head
		const angle = Math.atan2(end.y - start.y, end.x - start.x);
		this.ctx.beginPath();
		this.ctx.moveTo(end.x, end.y);
		this.ctx.lineTo(end.x - 6 * Math.cos(angle - Math.PI / 6), end.y - 6 * Math.sin(angle - Math.PI / 6));
		this.ctx.moveTo(end.x, end.y);
		this.ctx.lineTo(end.x - 6 * Math.cos(angle + Math.PI / 6), end.y - 6 * Math.sin(angle + Math.PI / 6));
		this.ctx.stroke();
	}

	private getSideCenter(x: number, y: number, w: number, h: number, side: Direction) {
		let cx = (x + w / 2) * this.cellSize;
		let cy = (y + h / 2) * this.cellSize;
		if (side === "top") cy = y * this.cellSize;
		if (side === "bottom") cy = (y + h) * this.cellSize;
		if (side === "left") cx = x * this.cellSize;
		if (side === "right") cx = (x + w) * this.cellSize;
		return { x: cx, y: cy };
	}

	private drawPowerLine(pf: PlacedFacility) {
		const powerLine = pf.facility as PowerLine;
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

	private drawWarehouse(pf: PlacedFacility) {
		// Handled by drawPlacedFacility using drawBaseFacility
	}

	drawPortIndicators(ports: { pf: PlacedFacility; port: GlobalPort; connected: boolean; isInput: boolean }[]) {
		const connectedProcessed = new Set<string>();

		for (const { pf, port, connected, isInput } of ports) {
			// Skip indicators for conveyors and power lines
			if ("patterns" in pf.facility || "inradius" in pf.facility) continue;

			if (connected) {
				// For connected ports, draw a single lime circle at the exact cell boundary.
				const boundaryKey = this.getBoundaryKey(port.x, port.y, port.dir);
				if (connectedProcessed.has(boundaryKey)) continue;
				connectedProcessed.add(boundaryKey);

				const pos = this.getGridBoundaryPosition(port.x, port.y, port.dir);
				this.ctx.fillStyle = "lime";
				this.ctx.beginPath();
				this.ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
				this.ctx.fill();
			} else {
				// Unconnected port: draw indicator inside the facility with a small offset
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

	private getBoundaryKey(x: number, y: number, side: Direction): string {
		let gx = x,
			gy = y,
			dir = side;
		// Normalize: top of (x,y) is same as bottom of (x, y-1)
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

	private getGridBoundaryPosition(gx: number, gy: number, side: Direction) {
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

	private getInsidePortPosition(gx: number, gy: number, side: Direction) {
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
}
