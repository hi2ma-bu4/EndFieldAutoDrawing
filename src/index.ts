import { Conveyor, CONVEYORS, Machine, MACHINES, POWER_LINES, PowerLine } from "./facilities_data";

class MapRenderer {
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

	drawMachine(x: number, y: number, machine: Machine) {
		this.ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
		this.ctx.fillRect(x * this.cellSize, y * this.cellSize, machine.w * this.cellSize, machine.h * this.cellSize);
		this.ctx.fillStyle = "black";
		this.ctx.fillText(machine.name, x * this.cellSize + 2, y * this.cellSize + 12);
	}

	drawConveyor(x: number, y: number, conveyor: Conveyor, patternIndex: number = 0) {
		this.ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
		this.ctx.fillRect(x * this.cellSize, y * this.cellSize, conveyor.w * this.cellSize, conveyor.h * this.cellSize);

		const pattern = conveyor.patterns[patternIndex] || conveyor.patterns[0];
		if (!pattern) return;

		// Draw connections
		this.ctx.strokeStyle = "rgba(0, 100, 0, 0.8)";
		this.ctx.lineWidth = 2;
		for (const conn of pattern) {
			const start = this.getSideCenter(x, y, conveyor.w, conveyor.h, conn.from);
			const end = this.getSideCenter(x, y, conveyor.w, conveyor.h, conn.to);

			this.ctx.beginPath();
			this.ctx.moveTo(start.x, start.y);
			this.ctx.lineTo(end.x, end.y);
			this.ctx.stroke();

			// Draw arrow head
			const angle = Math.atan2(end.y - start.y, end.x - start.x);
			this.ctx.beginPath();
			this.ctx.moveTo(end.x, end.y);
			this.ctx.lineTo(end.x - 5 * Math.cos(angle - Math.PI / 6), end.y - 5 * Math.sin(angle - Math.PI / 6));
			this.ctx.moveTo(end.x, end.y);
			this.ctx.lineTo(end.x - 5 * Math.cos(angle + Math.PI / 6), end.y - 5 * Math.sin(angle + Math.PI / 6));
			this.ctx.stroke();
		}
	}

	private getSideCenter(x: number, y: number, w: number, h: number, side: string) {
		let cx = (x + w / 2) * this.cellSize;
		let cy = (y + h / 2) * this.cellSize;
		if (side === "top") cy = y * this.cellSize;
		if (side === "bottom") cy = (y + h) * this.cellSize;
		if (side === "left") cx = x * this.cellSize;
		if (side === "right") cx = (x + w) * this.cellSize;
		return { x: cx, y: cy };
	}

	drawPowerLine(x: number, y: number, powerLine: PowerLine) {
		this.ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
		this.ctx.fillRect(x * this.cellSize, y * this.cellSize, powerLine.w * this.cellSize, powerLine.h * this.cellSize);

		// Influence range: rectangle centered on the power pole
		// allX = inradius + w + inradius
		// allY = inradius + H + inradius
		const rangeX = (x - powerLine.inradius) * this.cellSize;
		const rangeY = (y - powerLine.inradius) * this.cellSize;
		const rangeW = (powerLine.w + 2 * powerLine.inradius) * this.cellSize;
		const rangeH = (powerLine.h + 2 * powerLine.inradius) * this.cellSize;

		this.ctx.strokeStyle = "rgba(255, 255, 0, 0.3)";
		this.ctx.lineWidth = 1;
		this.ctx.strokeRect(rangeX, rangeY, rangeW, rangeH);
	}
}

window.onload = () => {
	const renderer = new MapRenderer("mapCanvas", 40, 40);
	renderer.drawGrid();

	// Sample rendering
	renderer.drawMachine(5, 5, MACHINES[0]);
	renderer.drawMachine(10, 5, MACHINES[1]);

	renderer.drawConveyor(5, 10, CONVEYORS[0], 0); // straight
	renderer.drawConveyor(7, 10, CONVEYORS[0], 1); // turn right
	renderer.drawConveyor(9, 10, CONVEYORS[0], 2); // turn left
	renderer.drawConveyor(11, 10, CONVEYORS[1]); // cross
	renderer.drawConveyor(13, 10, CONVEYORS[2]); // splitter
	renderer.drawConveyor(15, 10, CONVEYORS[3]); // merger

	renderer.drawPowerLine(20, 20, POWER_LINES[0]);
	renderer.drawPowerLine(35, 20, POWER_LINES[1]);
};
