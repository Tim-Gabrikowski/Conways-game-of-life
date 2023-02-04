import { parse } from "path";
import { inspect } from "util";

export function generateGrid(sizeX, sizeY, value = 0) {
	let grid = Array(sizeY);

	for (let index = 0; index < grid.length; index++) {
		let row = Array(sizeX);
		for (let x = 0; x < row.length; x++) {
			row[x] = value;
			grid[index] = row;
		}
	}

	return grid;
}

import INPUT_FILE from "../input.json" assert { type: "json" };

export function createStartGrid() {
	var grid = generateGrid(INPUT_FILE.grid.sizeX, INPUT_FILE.grid.sizeY);

	//parse patterns from file
	var parsedPatterns = [];

	for (let pIndex = 0; pIndex < INPUT_FILE.blueprints.length; pIndex++) {
		const blueprint = INPUT_FILE.blueprints[pIndex];
		var newPattern = { type: blueprint.type, lines: [] };

		for (let yIndex = 0; yIndex < blueprint.pattern.length; yIndex++) {
			const row = blueprint.pattern[yIndex];

			var newRow = [];
			var chars = row.split("");
			for (let xIndex = 0; xIndex < chars.length; xIndex++) {
				const char = chars[xIndex];

				let value = char == " " ? 0 : 1;

				newRow.push(value);
			}
			newPattern.lines.push(newRow);
		}
		parsedPatterns.push(newPattern);
	}

	//FIXME: something strange when placing 2 or more objects
	for (let p = 0; p < INPUT_FILE.objects.length; p++) {
		const object = INPUT_FILE.objects[p];

		console.log(object);
		let patternIndex = parsedPatterns.findIndex(
			(pat) => pat.type == object.type
		);
		if (patternIndex != -1) {
			let pattern = parsedPatterns[patternIndex];

			for (let pY = 0; pY < pattern.lines.length; pY++) {
				const line = pattern.lines[pY];
				let gridLine = grid[pY + object.y];

				for (let pX = 0; pX < line.length; pX++) {
					const cell = line[pX];

					gridLine[pX + object.x] = cell;
				}
				grid[pY + object.y] = gridLine;
			}
		}
	}

	return grid;
}
