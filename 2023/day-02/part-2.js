const fs = require('fs');

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  let sum = 0;

  for (let i = 0; i < puzzle.length; i++) {
    const line = puzzle[i];
    const game = parseGame(line);
    let minimum_number_of_cubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (let j = 0; j < game.sets.length; j++) {
      const sets = game.sets[j];

      for (let k = 0; k < sets.length; k++) {
        const cube = sets[k];
        const number = cube.number;
        const color = cube.color;
        
        minimum_number_of_cubes[color] = Math.max(minimum_number_of_cubes[color], number);
      }
    }

    sum += minimum_number_of_cubes.red * minimum_number_of_cubes.green * minimum_number_of_cubes.blue;
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