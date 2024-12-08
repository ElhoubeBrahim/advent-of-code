const fs = require('fs');

let cards = [];

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");

  for (let i = 0; i < puzzle.length; i++) {
    const line = puzzle[i];
    const card = parseCard(line);

    cards[i] = card;
  }

  let sum = 0;
  for (let i = puzzle.length - 1; i >= 0; i--) {
    sum += winCard(i);
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
    wins: 0,
  };

  card.id = parseInt(line[0].split(" ")[1].trim());

  let numbers = line[1].split(" | ");
  card.winning = numbers[0].split(" ").map(n => parseInt(n.trim()));
  card.numbers = numbers[1].split(" ").map(n => parseInt(n.trim()));

  card.wins = card.winning.filter(n => card.numbers.includes(n)).length;

  return card;
}

let memo = {};
function winCard(index) {
  if (index >= cards.length) return 0;
  if (memo[index]) return memo[index];

  const card = cards[index];
  let res = 1;

  for (let i = 1; i <= card.wins; i++) {
    res += winCard(index + i);
  }

  memo[index] = res;
  return res;
}