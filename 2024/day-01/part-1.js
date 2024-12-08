const fs = require("fs");

fs.readFile("puzzle.txt", "utf8", (err, data) => {
	if (err) throw err;

  // Read the puzzle input
	const puzzle = data.toString().split("\n");
	
  // Parse the puzzle input into 2 lists of numbers
  const numbers = [[], []];
  for (let i = 0; i < puzzle.length; i++) {
    const line = puzzle[i].trim();
    const parts = line.split("   ");

    numbers[0].push(parseInt(parts[0]));
    numbers[1].push(parseInt(parts[1]));
  }

  // Sort the lists of numbers
  numbers[0].sort((a, b) => a - b);
  numbers[1].sort((a, b) => a - b);

  // Solve the puzzle
  let result = 0;
  for (let i = 0; i < numbers[0].length; i++) {
    result += Math.abs(numbers[0][i] - numbers[1][i]);
  }

  console.log(result);
});
