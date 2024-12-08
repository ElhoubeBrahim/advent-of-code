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
		// Count the safe levels
		if (isLevelSafe(levels[i])) {
			count++;
		} else if (canLevelBeSafe(levels[i])) {
			count++;
		}
	}

	console.log(count);
});

const isLevelSafe = (level) => {
	const isIncreasing = level.every((x, i, arr) => i === 0 || x >= arr[i - 1]);
	const isDecreasing = level.every((x, i, arr) => i === 0 || x <= arr[i - 1]);

	// Check the 1st rule: The levels are either all increasing or all decreasing.
	let isSafe = isIncreasing || isDecreasing;
	if (!isSafe) {
		return false;
	}

	for (let j = 0; j < level.length - 1; j++) {
		const num1 = level[j];
		const num2 = level[j + 1];

		const diff = Math.abs(num1 - num2);

		// Check the 2nd rule: Any two adjacent levels differ by at least one and at most three
		if (diff < 1 || diff > 3) {
			return false;
		}
	}

	return true;
};

const canLevelBeSafe = (level) => {
	// Check if removing one report makes the level safe
	for (let i = 0; i < level.length; i++) {
		const newLevel = level.slice();
		newLevel.splice(i, 1);

		if (isLevelSafe(newLevel)) {
			return true;
		}
	}
};
