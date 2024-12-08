const fs = require('fs');

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  let sum = 0;

  for (let i = 0; i < puzzle.length; i++) {
    const line = puzzle[i];
    const card = parseCard(line);
    let winsCount = 0;

    for (let j = 0; j < card.numbers.length; j++) {
      if (card.winning.includes(card.numbers[j])) {
        winsCount++;
      }
    }

    sum += winsCount == 0 ? 0 : Math.pow(2, winsCount - 1);
  }

  console.log(sum);
});

function parseCard(line) {
  line = line.replace(/\s\s+/g, ' '); // Replace multiple spaces with a single space
  line = line.split(": ");
  let card = {
    id: 0,
    winning: [],
    numbers: [],
  };

  card.id = parseInt(line[0].split(" ")[1].trim());

  let numbers = line[1].split(" | ");
  card.winning = numbers[0].split(" ").map(n => parseInt(n.trim()));
  card.numbers = numbers[1].split(" ").map(n => parseInt(n.trim()));

  return card;
}