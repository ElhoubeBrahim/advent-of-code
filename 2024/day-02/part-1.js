const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

	// Read the puzzle input
	const puzzle = data.toString().split("\n");

	// Parse the puzzle input
	const levels = [];
	for (let i = 0; i < puzzle.length; i++) {
		const line = puzzle[i].trim().split(" ");
		levels.push(line.map((x) => parseInt(x)));
	}

	// Count the unsafe levels
	let count = 0;
	for (let i = 0; i < levels.length; i++) {
		let isIncreasing = levels[i].every(
			(x, i, arr) => i === 0 || x >= arr[i - 1]
		);
		let isDecreasing = levels[i].every(
			(x, i, arr) => i === 0 || x <= arr[i - 1]
		);

		// Check the 1st rule: The levels are either all increasing or all decreasing.
		let isSafe = isIncreasing || isDecreasing;

		if (!isSafe) {
			continue;
		}

		for (let j = 0; j < levels[i].length - 1; j++) {
			const num1 = levels[i][j];
			const num2 = levels[i][j + 1];

			const diff = Math.abs(num1 - num2);

      // Check the 2nd rule: Any two adjacent levels differ by at least one and at most three
			if (diff < 1 || diff > 3) {
				isSafe = false;
				break;
			}
		}

    // Count the safe levels
		if (isSafe) {
			count++;
		}
	}

	console.log(count);
});
