const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

	// Read the puzzle input
	const puzzle = data.toString().split("\n");

	let result = 0;
  let canPerformMUL = true;
	for (let i = 0; i < puzzle.length; i++) {
		const line = puzzle[i];

		// Find all occurences of "don't", "do" and "mul(a,b)"
		const matches = line.match(/(don't\(\))|(do\(\))|(mul\(\d+,\d+\))/g);
		if (matches) {
			matches.forEach((match) => {
				if (match === "don't()") {
          // Turn the flag off
					canPerformMUL = false;
				} else if (match === "do()") {
          // Turn the flag on
					canPerformMUL = true;
				} else if (canPerformMUL) {
					// Extract the values of a and b & calculate the result
					const [_, a, b] = match.match(/mul\((\d+),(\d+)\)/);
					result += a * b;
				}
			});
		}
	}

	console.log(result);
});
