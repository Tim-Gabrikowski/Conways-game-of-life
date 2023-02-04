import chalk from "chalk";

export function renderGrid(grid, neibours = undefined) {
	console.clear();
	console.log(
		chalk.bgWhite(chalk.white("\u25A0\u25A0")) +
			chalk.bgWhite(chalk.white("\u25A0\u25A0")).repeat(grid[0].length) +
			chalk.bgWhite(chalk.white("\u25A0\u25A0"))
	);

	grid.forEach((dataRow, yPos) => {
		var row = chalk.bgWhite(chalk.white("\u25A0\u25A0"));
		dataRow.forEach((dataCell, xPos) => {
			if (neibours !== undefined) {
				row +=
					dataCell == 0
						? chalk.bgBlack(` ${neibours[yPos][xPos]} `)
						: chalk.bgWhite(` ${neibours[yPos][xPos]} `);
			} else {
				row +=
					dataCell == 0
						? chalk.bgBlack(chalk.black("\u25A0\u25A0"))
						: chalk.bgWhite(chalk.white("\u25A0\u25A0"));
			}
		});
		row += chalk.bgWhite(chalk.white("\u25A0\u25A0"));
		console.log(row);
	});

	console.log(
		chalk.bgWhite(chalk.white("\u25A0\u25A0")) +
			chalk.bgWhite(chalk.white("\u25A0\u25A0")).repeat(grid[0].length) +
			chalk.bgWhite(chalk.white("\u25A0\u25A0"))
	);
}
