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

  // Solve the puzzle
  let result = 0;
  for (let i = 0; i < numbers[0].length; i++) {
    const number = numbers[0][i];
    const frequency = numbers[1].filter(n => n === number).length;

    result += number * frequency;
  }

  console.log(result);
});
