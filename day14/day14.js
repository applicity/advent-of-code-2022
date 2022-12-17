// Sort a range so the start to finish are in the right order.
const normaliseRange = (start, end) => {
  const normal = [start, end].sort((a, b) => a[0] - b[0] + a[1] - b[1]);
  return { from: normal[0], to: normal[1] };
};

// Set the map to be rock using the ranges
const processRange = (map, range) => {
  for (let i = 0; i < range.length - 1; i += 1) {
    const { from, to } = normaliseRange(range[i], range[i + 1]);
    for (let y = from[1]; y <= to[1]; y += 1) {
      for (let x = from[0]; x <= to[0]; x += 1) {
        // eslint-disable-next-line no-param-reassign
        map[y][x] = '#';
      }
    }
  }
};

const setupData = (input, part2 = false) => {
  const map = [];

  const points = input.map((l) => l.split(' -> ').map((p) => p.split(',').map((i) => parseInt(i, 10))));
  const maxX = Math.max(...points.flat(1).map((p) => p[0]));
  const maxY = Math.max(...points.flat(1).map((p) => p[1]));

  for (let y = 0; y <= maxY + (part2 ? 3 : 1); y += 1) {
    map[y] = [];

    for (let x = 0; x <= maxX * (part2 ? 2 : 1); x += 1) {
      map[y][x] = '.';
    }
  }

  if (part2) {
    points.push([[0, maxY + 2], [maxX * 2, maxY + 2]]);
  }

  // Setup the rock.
  points.forEach((r) => processRange(map, r));

  const start = [500, 0];
  map[start[1]][start[0]] = '+';

  return { map, start, maxY: part2 ? maxY + 2 : maxY };
};

const getPosition = (map, pos) => {
  const options = [[0, 1], [-1, 1], [1, 1]].filter((p) => map[pos[1] + p[1]][pos[0] + p[0]] === '.');

  if (!options.length) {
    return pos;
  }

  return options[0].map((v, i) => v + pos[i]);
};

const displayWindow = (map, from = 493, to = 503) => {
  const display = map.map((l) => l.slice(from, to).join('')).join('\n');
  return display;
};

const day14 = (input, part2 = false) => {
  const { map, start, maxY } = setupData(input, part2);

  let inBounds = true;
  while (inBounds) {
    let run = true;
    let pos = [...start];
    while (run) {
      const newPos = getPosition(map, pos);

      if (newPos[1] > maxY) {
        inBounds = false;
        run = false;
      } else if (pos[1] !== newPos[1]) {
        pos = newPos;
      } else {
        map[pos[1]][pos[0]] = 'o';
        run = false;
        // We couldn't move and we are at the start
        if (pos[1] === 0) {
          inBounds = false;
        }
      }

      if (pos[1] > maxY) {
        inBounds = false;
      }
    }
  }

  // console.log(displayWindow(map, 480, 520));
  return map.flat().filter((c) => c === 'o').length;
};

module.exports = {
  day14,
  displayWindow,
};
