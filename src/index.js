import INPUT_GRID from "./exampleGrid.js";
import { createStartGrid } from "./generator.js";
import { renderGrid } from "./renderer.js";

const ITERATION_TIME = 100;

//main Run:

var grid = createStartGrid();

revolution(grid);

// Calculates the revolutions and renders them, calls itself for next resolution
function revolution(inputGrid) {
	var newGrid = [];
	var nCountGrid = [];

	for (let yPos = 0; yPos < inputGrid.length; yPos++) {
		const dataRow = inputGrid[yPos];
		var newDataRow = [];
		var nCountRow = [];

		for (let xPos = 0; xPos < dataRow.length; xPos++) {
			const dataCell = dataRow[xPos];
			var newDataCell = 0;

			var neibours = countNeighbours(inputGrid, xPos, yPos);

			if (dataCell == 1 && (neibours == 2 || neibours == 3)) {
				newDataCell = 1;
			} else if (dataCell == 0 && neibours == 3) {
				newDataCell = 1;
			} else {
				newDataCell = 0;
			}
			newDataRow.push(newDataCell);
			nCountRow.push(neibours);
		}
		newGrid.push(newDataRow);
		nCountGrid.push(nCountRow);
	}

	renderGrid(newGrid);
	setTimeout(() => revolution(newGrid), ITERATION_TIME);
}

function countNeighbours(grid, xPos, yPos) {
	var out = 0;

	var rowAbove = grid[yPos - 1] || 0;
	var cellRow = grid[yPos] || 0;
	var rowBelow = grid[yPos + 1] || 0;

	out = out + (rowAbove[xPos - 1] == 1 ? 1 : 0);
	out = out + (rowAbove[xPos] == 1 ? 1 : 0);
	out = out + (rowAbove[xPos + 1] == 1 ? 1 : 0);

	out = out + (cellRow[xPos - 1] == 1 ? 1 : 0);
	out = out + (cellRow[xPos + 1] == 1 ? 1 : 0);

	out = out + (rowBelow[xPos - 1] == 1 ? 1 : 0);
	out = out + (rowBelow[xPos] == 1 ? 1 : 0);
	out = out + (rowBelow[xPos + 1] == 1 ? 1 : 0);

	return out;
}
