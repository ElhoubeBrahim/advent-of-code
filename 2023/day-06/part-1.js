const fs = require('fs');

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  const races = parsePuzzle(puzzle);

  let res = 1;
  races.forEach(race => {
    let winsCount = 0;
    for (let i = 0; i < race.time; i++) {
      if (holdSpeedButton(race.time, i) > race.distance) {
        winsCount++;
      }
    }

    res *= winsCount;
  });

  console.log(res);
});

function parsePuzzle(puzzle) {
  const time = extractNumbers(puzzle[0]);
  const distance = extractNumbers(puzzle[1]);
  
  return time.map((t, i) => {
    return {
      time: t,
      distance: distance[i]
    }
  });
}

function extractNumbers(str) {
  return str.match(/\d+/g).map(Number);
}

function holdSpeedButton(raceTime, holdTime) {
  return (raceTime - holdTime) * holdTime;
}