const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

	// Read the puzzle input
	const puzzle = data.toString().split("\n")[0];

	// Decode the puzzle: 2333133121414131402 => 00...111...2...333.44.5555.6666.777.888899
	let decoded = [];
	let blockID = 0;
	for (let i = 0; i < puzzle.length; i++) {
		const count = parseInt(puzzle[i]);

		if (i % 2 == 0) {
			decoded.push(...repeatChar(blockID.toString(), count));
		} else {
			decoded.push(...repeatChar(".", count));
			blockID++;
		}
	}

	// Move blocks: 00...111...2...333.44.5555.6666.777.888899 => 0099811188827773336446555566..............
	let l = 0;
	let r = decoded.length - 1;
	while (r > l) {
		const leftPointer = decoded[l];
		const rightPointer = decoded[r];

		if ((leftPointer === ".") & (rightPointer !== ".")) {
			decoded[l] = rightPointer;
			decoded[r] = ".";
			l++;
			r--;
			continue;
		}

		leftPointer !== "." ? l++ : r--;
	}

	// Calculate checksum
	let checksum = 0;
	for (let i = 0; i < decoded.length; i++) {
		if (decoded[i] === ".") {
			break;
		}

		checksum += i * parseInt(decoded[i]);
	}

	console.log(checksum);
});

const repeatChar = (char, count) => {
	let result = [];

	for (let i = 0; i < count; i++) {
		result.push(char);
	}

	return result;
};
