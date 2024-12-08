const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

	// Read the puzzle input
	const puzzle = data.toString().split("\n");
	const WORD = "XMAS";

	// Parse the puzzle input
	let search = [];
	for (let i = 0; i < puzzle.length; i++) {
		search.push(puzzle[i].trim().split(""));
	}

	// Construct final search list
	const searchList = [];
	for (let i = 0; i < search.length; i++) {
		// Add rows
		searchList.push(search[i].join(""));

		// Add columns
		let column = "";
		for (let j = 0; j < search[i].length; j++) {
			column += search[j][i];
		}
		searchList.push(column);
	}

	// Add diagonals
	const diagonals = getMatrixDiagonals(search);
	searchList.push(...diagonals.topLeftToBottomRight);
	searchList.push(...diagonals.topRightToBottomLeft);

	// Solve the puzzle
	let count = 0;
	for (let i = 0; i < searchList.length; i++) {
		// Check for normal
		const matches = searchList[i].match(new RegExp(`${WORD}`, "g"));
		count += matches ? matches.length : 0;

		// Check for reverse
		const reverseMatches = searchList[i].match(
			new RegExp(`${WORD.split("").reverse().join("")}`, "g")
		);
		count += reverseMatches ? reverseMatches.length : 0;
	}

	console.log(count);
});

const getMatrixDiagonals = (matrix) => {
	const rows = matrix.length;
	const cols = matrix[0].length;

	const diagonals = {
		topLeftToBottomRight: [],
		topRightToBottomLeft: [],
	};

	// Get diagonals from top-left to bottom-right
	for (let k = 0; k < rows + cols - 1; k++) {
		let diagonal = "";
		for (let i = 0; i <= k; i++) {
			const j = k - i;
			if (i < rows && j < cols) {
				diagonal += matrix[i][j];
			}
		}
		if (diagonal) {
			diagonals.topLeftToBottomRight.push(diagonal);
		}
	}

	// Get diagonals from top-right to bottom-left
	for (let k = 0; k < rows + cols - 1; k++) {
		let diagonal = "";
		for (let i = 0; i <= k; i++) {
			const j = cols - 1 - (k - i);
			if (i < rows && j >= 0) {
				diagonal += matrix[i][j];
			}
		}
		if (diagonal) {
			diagonals.topRightToBottomLeft.push(diagonal);
		}
	}

	return diagonals;
};
