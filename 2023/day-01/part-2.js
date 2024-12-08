const fs = require('fs');

const TOKENS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  let sum = 0;

  for (let i = 0; i < puzzle.length; i++) {
    let line = puzzle[i];

    for (let j = 0; j < TOKENS.length; j++) {
      const match = TOKENS[j];
      const n = j + 1;

      line = line.replaceAll(match, match[0] + n + match[match.length - 1]);
    }

    const numbers = [null, null];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (isNaN(parseInt(char))) {
        continue;
      }

      numbers[0] === null 
        ? numbers[0] = parseInt(char) 
        : numbers[1] = parseInt(char);
    }

    if (numbers[1] === null) {
      numbers[1] = numbers[0];
    }

    sum += parseInt(numbers[0] * 10 + numbers[1]);
  }

  console.log(sum);
});