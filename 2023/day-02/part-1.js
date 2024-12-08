const fs = require('fs');

const number_of_cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  let sum = 0;

  for (let i = 0; i < puzzle.length; i++) {
    const line = puzzle[i];
    const game = parseGame(line);
    let is_valid = true;

    for (let j = 0; j < game.sets.length; j++) {
      const sets = game.sets[j];

      for (let k = 0; k < sets.length; k++) {
        const cube = sets[k];
        const number = cube.number;
        const color = cube.color;

        if (number_of_cubes[color] < number) {
          is_valid = false;
          break;
        }
      }
    }

    if (is_valid) {
      sum += game.id;
    }
  }

  console.log(sum);
});

function parseGame(line) {
  const game = {
    id: null,
    sets: [],
  }

  line = line.split(":");
  game.id = parseInt(line[0].split(" ")[1]);

  const sets = line[1].split(";");
  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    game.sets.push(parseSet(set));
  }

  return game;
}

function parseSet(set) {
  const cubes = set.trim().split(", ");

  return cubes.map(cube => {
    cube = cube.split(" ");
    const number = parseInt(cube[0]);
    const color = cube[1];

    return {
      color,
      number,
    }
  });
}