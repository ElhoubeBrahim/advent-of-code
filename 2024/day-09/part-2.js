const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

	// Read the puzzle input
	const puzzle = data.toString().split("\n")[0];

	// Decode the puzzle: { isFreeSpace: boolean, id: number, size: number }
	let decoded = [];
	let blockID = 0;
	for (let i = 0; i < puzzle.length; i++) {
		const count = parseInt(puzzle[i]);

		if (i % 2 == 0) {
			decoded.push({
				isFreeSpace: false,
				id: blockID,
				size: count,
			});
		} else {
			decoded.push({
				isFreeSpace: true,
				size: count,
			});
			blockID++;
		}
	}

	// Move files to the right spot
	for (let i = decoded.length - 1; i > 0; i--) {
		if (decoded[i].isFreeSpace) {
			continue;
		}

		const file = decoded[i];

		// Find the right spot
		for (let j = 1; j < i; j++) {
			if (!decoded[j].isFreeSpace) {
				continue;
			}

			const freeSpace = decoded[j];

			// If the current file fits in the free space
			if (file.size <= freeSpace.size) {
				// Shrink the free space
				decoded[j].size -= file.size;

				// Free the file position
				decoded[i] = {
					isFreeSpace: true,
					size: file.size,
				};

				// Move the file to the right spot
				decoded.splice(j, 0, file);
				break;
			}
		}
	}

	// // Calculate checksum
	let checksum = 0;
	let index = 0; // Track the position of ID
	for (let i = 0; i < decoded.length; i++) {
		if (!decoded[i].isFreeSpace) {
			const block = decoded[i];

			for (let j = 0; j < block.size; j++) {
				checksum += index * block.id;
				index++;
			}
		} else {
			index += decoded[i].size;
		}
	}

	console.log(checksum);
});
