const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

	// Read the puzzle input
	const puzzle = data.toString().split("\n");

	let result = 0;
	for (let i = 0; i < puzzle.length; i++) {
		const line = puzzle[i];

		// Find all occurences of "mul(a,b)"
		const matches = line.match(/mul\(\d+,\d+\)/g);
		if (matches) {
			matches.forEach((match) => {
				// Extract the values of a and b
				const [a, b] = match.match(/\d+/g);

				// Calculate the result
				result += a * b;
			});
		}
	}

	console.log(result);
});
