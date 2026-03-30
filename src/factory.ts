import { CONVEYORS, type Direction, type PlacedFacility, type Rotation } from "./facilities_data";
import { getRotatedDimensions, rotateDirection, rotatePort } from "./utils";

export interface GlobalPort {
	x: number;
	y: number;
	dir: Direction;
	type?: string;
}

export class FactoryMap {
	private facilities: PlacedFacility[] = [];

	addFacility(pf: PlacedFacility) {
		this.facilities.push(pf);
	}

	getFacilities(): readonly PlacedFacility[] {
		return this.facilities;
	}

	getFacilityAt(x: number, y: number): PlacedFacility | undefined {
		return this.facilities.find((pf) => {
			const { w, h } = getRotatedDimensions(pf.facility.w, pf.facility.h, pf.rotation);
			return x >= pf.x && x < pf.x + w && y >= pf.y && y < pf.y + h;
		});
	}

	getInputs(pf: PlacedFacility): GlobalPort[] {
		const ports: GlobalPort[] = [];
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

	getOutputs(pf: PlacedFacility): GlobalPort[] {
		const ports: GlobalPort[] = [];
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

	private getGlobalPort(x: number, y: number, rw: number, rh: number, side: Direction, pos: number, type?: string): GlobalPort {
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
		const results: {
			pf: PlacedFacility;
			port: GlobalPort;
			connected: boolean;
			isInput: boolean;
		}[] = [];

		for (const pf of this.facilities) {
			// Inputs
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

			// Outputs
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
		// Kept for backward compatibility if needed, but we should use getAllPortsWithStatus
		const results: {
			from: PlacedFacility;
			port: GlobalPort;
			neighbor?: PlacedFacility;
			connected: boolean;
		}[] = [];
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
					connected,
				});
			}
		}
		return results;
	}

	private getNeighbor(x: number, y: number, side: Direction) {
		if (side === "top") return { nx: x, ny: y - 1 };
		if (side === "bottom") return { nx: x, ny: y + 1 };
		if (side === "left") return { nx: x - 1, ny: y };
		return { nx: x + 1, ny: y };
	}

	private getOpposite(side: Direction): Direction {
		if (side === "top") return "bottom";
		if (side === "bottom") return "top";
		if (side === "left") return "right";
		return "left";
	}

	static getConveyorConfig(from: Direction, to: Direction): { rotation: Rotation; conveyorPatternIndex: number } {
		const conveyor = CONVEYORS[0]; // Belt Conveyor
		const rotations: Rotation[] = [0, 90, 180, 270];

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
		// Default to straight up
		return { rotation: 0, conveyorPatternIndex: 0 };
	}
}
