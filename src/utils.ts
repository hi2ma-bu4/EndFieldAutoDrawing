import { type Direction, type Port, type Rotation } from "./facilities_data";

export function rotateDirection(dir: Direction, rotation: Rotation): Direction {
	const dirs: Direction[] = ["top", "right", "bottom", "left"];
	const idx = dirs.indexOf(dir);
	const offset = rotation / 90;
	return dirs[(idx + offset) % 4];
}

export function getRotatedDimensions(w: number, h: number, rotation: Rotation): { w: number; h: number } {
	if (rotation === 90 || rotation === 270) {
		return { w: h, h: w };
	}
	return { w, h };
}

export function rotatePort(port: Port, w: number, h: number, rotation: Rotation): Port {
	const rotatedSide = rotateDirection(port.side, rotation);
	let rotatedPosition = port.position;

	// Coordinate mapping (x, y) with (0,0) as top-left of the facility.
	// Width w (x: 0 to w-1), Height h (y: 0 to h-1).
	// top side: (pos, 0), right side: (w-1, pos), bottom side: (pos, h-1), left side: (0, pos)

	if (rotation === 90) {
		// (x, y) -> (h - 1 - y, x)
		// top: (pos, 0) -> (h-1, pos). Side: right, new pos: pos.
		// right: (w-1, pos) -> (h-1-pos, w-1). Side: bottom, new pos: h-1-pos.
		// bottom: (pos, h-1) -> (0, pos). Side: left, new pos: pos.
		// left: (0, pos) -> (h-1-pos, 0). Side: top, new pos: h-1-pos.
		if (port.side === "top") rotatedPosition = port.position;
		else if (port.side === "right") rotatedPosition = h - 1 - port.position;
		else if (port.side === "bottom") rotatedPosition = port.position;
		else if (port.side === "left") rotatedPosition = h - 1 - port.position;
	} else if (rotation === 180) {
		// top (x) -> bottom (x=w-x-1)
		// right (y) -> left (y=h-y-1)
		// bottom (x) -> top (x=w-x-1)
		// left (y) -> right (y=h-y-1)
		if (port.side === "top" || port.side === "bottom") rotatedPosition = w - port.position - 1;
		else rotatedPosition = h - port.position - 1;
	} else if (rotation === 270) {
		// (x, y) -> (y, w - 1 - x)
		// top: (pos, 0) -> (0, w-1-pos). Side: left, new pos: w-1-pos.
		// right: (w-1, pos) -> (pos, 0). Side: top, new pos: pos.
		// bottom: (pos, h-1) -> (h-1, w-1-pos). Side: right, new pos: w-1-pos.
		// left: (0, pos) -> (pos, h-1). Side: bottom, new pos: pos.
		if (port.side === "top") rotatedPosition = w - 1 - port.position;
		else if (port.side === "right") rotatedPosition = port.position;
		else if (port.side === "bottom") rotatedPosition = w - 1 - port.position;
		else if (port.side === "left") rotatedPosition = port.position;
	}

	return {
		side: rotatedSide,
		position: rotatedPosition,
		type: port.type,
	};
}
