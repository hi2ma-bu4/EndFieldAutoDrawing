import { CONVEYORS, MACHINES, type PlacedFacility, WAREHOUSES } from "./facilities_data";
import { FactoryMap } from "./factory";
import { ITEMS } from "./item_data";
import { RECIPES } from "./recipe_data";
import { MapRenderer } from "./renderer";

window.onload = () => {
	const renderer = new MapRenderer("mapCanvas", 40, 40);
	const map = new FactoryMap();

	// Machine: Refining Unit (3x3), input top, output bottom.
	// Place it at (10, 5).
	const machine1: PlacedFacility = { facility: MACHINES[0], x: 10, y: 5, rotation: 0 };
	map.addFacility(machine1);

	// Conveyor from machine1 output.
	// Machine1 is at (10, 5), size 3x3. Output is bottom side (y=7, x=10,11,12).
	// Let's place a conveyor at (11, 8). Input should be TOP.
	// To move it down, output should be BOTTOM.
	const c1 = FactoryMap.getConveyorConfig("top", "bottom");
	const conv1: PlacedFacility = { facility: CONVEYORS[0], x: 11, y: 8, ...c1 };
	map.addFacility(conv1);

	// Another conveyor at (11, 9), input TOP, output RIGHT.
	const c2 = FactoryMap.getConveyorConfig("top", "right");
	const conv2: PlacedFacility = { facility: CONVEYORS[0], x: 11, y: 9, ...c2 };
	map.addFacility(conv2);

	// Another conveyor at (12, 9), input LEFT, output RIGHT.
	const c3 = FactoryMap.getConveyorConfig("left", "right");
	const conv3: PlacedFacility = { facility: CONVEYORS[0], x: 12, y: 9, ...c3 };
	map.addFacility(conv3);

	// Second turn at (13, 9), input LEFT, output TOP. (↗ style)
	const c4 = FactoryMap.getConveyorConfig("left", "top");
	const conv4: PlacedFacility = { facility: CONVEYORS[0], x: 13, y: 9, ...c4 };
	map.addFacility(conv4);

	// Another turn at (13, 7), input BOTTOM, output RIGHT. (↘ style)
	const c5 = FactoryMap.getConveyorConfig("bottom", "right");
	const conv5: PlacedFacility = { facility: CONVEYORS[0], x: 13, y: 7, ...c5 };
	map.addFacility(conv5);

	// Another conveyor going up at (13, 8), input BOTTOM, output TOP.
	const c6 = FactoryMap.getConveyorConfig("bottom", "top");
	const conv6: PlacedFacility = { facility: CONVEYORS[0], x: 13, y: 8, ...c6 };
	map.addFacility(conv6);

	// Test Warehouse
	const wh1: PlacedFacility = { facility: WAREHOUSES[3], x: 20, y: 5, rotation: 0 };
	map.addFacility(wh1);

	// Render the map
	renderer.drawMap(map);

	console.log("Items loaded:", ITEMS);
	console.log("Recipes loaded:", RECIPES);
};
