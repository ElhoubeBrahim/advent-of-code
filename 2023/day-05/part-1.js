const fs = require('fs');

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  let seeds = parseSeeds(puzzle[0]);
  let maps = parseMaps(puzzle.slice(2));

  let locations = [];
  for (let i = 0; i < seeds.length; i++) {
    let number = seeds[i];

    for (let j = 0; j < maps.length; j++) {
      const map = maps[j];

      for (let k = 0; k < map.length; k++) {
        const mapLine = map[k];
        const range =  [mapLine.source, mapLine.source + mapLine.range];

        if (number >= range[0] && number <= range[1]) {
          number = mapLine.destiniation + (number - range[0]);
          break;
        }
      }
    }

    locations.push(number);
  }

  console.log(Math.min(...locations));
});

function parseSeeds(line) {
  line = line.split(": ")[1];
  return line.split(" ").map((seed) => parseInt(seed))
}

function parseMaps(puzzle) {
  let maps = [];
  let mapsIndex = -1;

  for (let i = 0; i < puzzle.length; i++) {
    const line = puzzle[i];

    if (line.trim() === "") continue;
    
    if (isMapTitle(line)) {
      mapsIndex++;
      maps[mapsIndex] = [];
      continue;
    }

    maps[mapsIndex].push(parseMapLine(line));
  }

  return maps;
}

function isMapTitle(line) {
  return line.indexOf("map:") !== -1;
}

function parseMapLine(line) {
  line = line.split(" ");

  return {
    destiniation: parseInt(line[0]),
    source: parseInt(line[1]),
    range: parseInt(line[2]),
  };
}