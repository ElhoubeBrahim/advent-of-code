const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

	// Read the puzzle input
	const puzzle = data.toString().split("\n");

	// Parse the puzzle input
	const orderings = {};
	const updates = [];
	let line = 0;

	// Prase the orderings
	for (let i = line; i < puzzle.length; i++, line++) {
		const currLine = puzzle[i].trim();

		if (currLine === "") {
			line++;
			break;
		}

		const parts = currLine.split("|");
		const key = parseInt(parts[0]);

		// orderings[page] = [pages that must come after page]
		if (orderings[key]) {
			orderings[key].push(parseInt(parts[1]));
		} else {
			orderings[key] = [parseInt(parts[1])];
		}
	}

	// Parse the updates
	for (let i = line; i < puzzle.length; i++, line++) {
		const currLine = puzzle[i].trim();
		updates.push(currLine.split(",").map((x) => parseInt(x)));
	}

	// Calculate the middle pages sum of invalid updates after ordering
	let sum = 0;
	for (let i = 0; i < updates.length; i++) {
		let isValid = true;

		for (let j = updates[i].length - 1; j > 0; j--) {
			const currPage = updates[i][j];

			// Check if all pages before the current page are not in the orderings (pages that must come after page)
			for (let k = j - 1; k >= 0; k--) {
				if (
					orderings[currPage] &&
					orderings[currPage].includes(updates[i][k])
				) {
					isValid = false;
					break;
				}
			}
		}

		// If the update is not valid, reoder the pages and add the middle page to the sum
		if (!isValid) {
			const orderedUpdate = orderUpdate(updates[i], orderings);
			sum += orderedUpdate[Math.floor(orderedUpdate.length / 2)];
		}
	}

	console.log(sum);
});

const orderUpdate = (update, orderings) => {
	let isValid = false;

	// Keep swapping pages until the update is valid
	while (!isValid) {
		isValid = true;
		for (let j = update.length - 1; j > 0; j--) {
			const currPage = update[j];

			// Check if all pages before the current page are not in the orderings (pages that must come after page)
			for (let k = j - 1; k >= 0; k--) {
				if (orderings[currPage] && orderings[currPage].includes(update[k])) {
					isValid = false;

					// Swap the two pages
					const temp = update[j];
					update[j] = update[k];
					update[k] = temp;
				}
			}
		}
	}

	return update;
};
