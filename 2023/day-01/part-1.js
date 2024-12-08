const fs = require('fs');

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  let sum = 0;

  for (let i = 0; i < puzzle.length; i++) {
    const line = puzzle[i];
    
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