const fs = require('fs');

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  // Parse the puzzle
  const puzzle = data.toString().split("\n");
  let seeds = parseSeeds(puzzle[0]);
  let maps = parseMaps(puzzle.slice(2));

  let locations = [];

  // Loop through the seeds ranges
  for (let i = 0; i < seeds.length; i += 2) {
    // Create seed range mapping
    let seed = seeds[i];
    let seedRange = seeds[i + 1];
    let mappings = [[seed, seed + seedRange]];

    // Loop through the maps (puzzle input)
    for (let j = 0; j < maps.length; j++) {
      // Transform the intervals through the maps
      let tmp = [];
      for (let k = 0; k < mappings.length; k++) {
        tmp.push(...mapSeedsRange(mappings[k][0], mappings[k][1] - mappings[k][0], maps[j]));
      }

      // Get the resulting intervals
      mappings = JSON.parse(JSON.stringify(tmp));
    }

    // The final mapings will be the locations of the seeds
    locations.push(mappings.sort((a, b) => a[0] - b[0]).at(0)[0]);
  }

  // Output the result
  console.log(locations.sort((a, b) => a - b)[0]);
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

  const destiniation = parseInt(line[0]);
  const source = parseInt(line[1]);
  const range = parseInt(line[2]);

  return {
    destiniation: [destiniation, destiniation + range - 1],
    source: [source, source + range - 1],
    range: range,
  };
}

function inRange(value, range) {
  return value >= range[0] && value <= range[1];
}

function mapSeedsRange(seed, range, mappings) {
  let result = [];

  // Sort mappings by source
  mappings.sort((a, b) => a.source[0] - b.source[0]);

  // Init the range extremes to map
  let start = seed;
  let end = seed + range - 1;

  // If the first mapping doesn't start at 0, add a range from 0 to the first mapping
  if (start < mappings[0].source[0]) {
    // Check if the range ends before the first mapping or not
    if (end < mappings[0].source[0]) return [[start, end]];

    // Otherwise, add a range from 0 to the first mapping
    result.push([start, mappings[0].source[0] - 1]);
    start = mappings[0].source[0];
  }

  // Loop through the mappings
  for (let i = 0; i < mappings.length; i++) {
    const mapping = mappings[i];
    let tmp = [];

    if (!inRange(start, mapping.source)) {
      continue;
    }

    // If the mapping starts after the start value, add a range from the start to the mapping
    tmp.push(mapping.destiniation[0] + (start - mapping.source[0]));

    // Check if the range end is in the mapping
    if (inRange(end, mapping.source)) { // If it does, add a range from the start to the end
      tmp.push(mapping.destiniation[0] + (end - mapping.source[0]));
    } else { // If it doesn't, add a range from the start to the end of the mapping, and start from there
      tmp.push(mapping.destiniation[1]);
      start = mapping.source[1] + 1;
    }

    // Add the range to the result
    result.push(tmp);
  }

  // If there is unmaped range left, add it to the result
  if (start >= mappings[mappings.length - 1].source[1]) {
    result.push([start, end]);
  }

  return result;
}