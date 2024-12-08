const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

	// Read the puzzle input
	const puzzle = data.toString().split("\n");

	// Parse the puzzle input
	let search = [];
	for (let i = 0; i < puzzle.length; i++) {
		search.push(puzzle[i].trim().split(""));
	}

	// Solve the puzzle
	let count = 0;
	for (let i = 1; i < search.length - 1; i++) {
		for (let j = 1; j < search[i].length - 1; j++) {
			const char = search[i][j];

			// Check the center of the X-MAS
			if (char === "A") {
				// Get surroundings
				const topLeft = search[i - 1][j - 1];
				const topRight = search[i - 1][j + 1];
				const bottomLeft = search[i + 1][j - 1];
				const bottomRight = search[i + 1][j + 1];

				// Check patterns
				if (checkXMAS([topLeft, topRight, bottomLeft, bottomRight])) {
					count++;
				}
			}
		}
	}

	console.log(count);
});

const checkXMAS = (arr) => {
	const patterns = ["MMSS", "SSMM", "MSMS", "SMSM"];
	return patterns.includes(arr.join(""));
};
