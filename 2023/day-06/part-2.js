const fs = require('fs');

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  const race = parsePuzzle(puzzle);

  let winsCount = 0;
  for (let i = 0; i < race.time; i++) {
    if (holdSpeedButton(race.time, i) > race.distance) {
      winsCount++;
    }
  }
    
    console.log(winsCount);
});

function parsePuzzle(puzzle) {
  const time = extractNumbers(puzzle[0].replaceAll(" ", ""))[0];
  const distance = extractNumbers(puzzle[1].replaceAll(" ", ""))[0];
  
  return {
    time, distance
  };
}

function extractNumbers(str) {
  return str.match(/\d+/g).map(Number);
}

function holdSpeedButton(raceTime, holdTime) {
  return (raceTime - holdTime) * holdTime;
}