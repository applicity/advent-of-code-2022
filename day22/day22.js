/* eslint-disable no-continue */

const extractor = /([0-9]+)([LR])?/g;

const setupData = (input) => {
  const parts = input.split('\n\n');
  const instructions = parts[1].split('\n')[0];
  const rows = parts[0].split('\n');
  const maxLength = Math.max(...rows.map((r) => r.length));
  const mapRows = rows.map((r) => r.padEnd(maxLength, ' ')).map((l) => l.split(''));

  const startX = mapRows[0].indexOf('.');
  const start = [startX, 0];

  const mapCols = [];

  for (let i = 0; i < maxLength; i += 1) {
    mapCols[i] = [];
    mapRows.forEach((mr, j) => {
      mapCols[i][j] = mr[i];
    });
  }

  const moves = [...instructions.matchAll(extractor)].map((i) => [i[1], i[2]]);
  return {
    moves, mapRows, mapCols, start, map: { mapRows, mapCols },
  };
};

// Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^)
const getFacing = (current, rotation) => {
  let facing = current;

  if (rotation === 'R') {
    facing += 1;
  } else {
    facing -= 1;
  }

  if (facing > 3) facing = 0;
  if (facing < 0) facing = 3;

  return facing;
};

const moveInArray = (a, current, dir) => {
  // Out of bounds
  if (current + dir < 0 || current + dir >= a.length || a[current + dir] === ' ') {
    const seek = dir > 0 ? a : [...a].reverse();
    // find the first # and . if the . comes first then we can move.
    const dot = seek.indexOf('.');
    const hash = seek.indexOf('#');
    if (hash !== -1 && hash < dot) {
      return current;
    }
    return dir > 0 ? dot : seek.length - 1 - dot;
  }

  // is the next thing ok?
  if (a[current + dir] === '.') {
    return current + dir;
  }

  // Can't move
  if (a[current + dir] === '#') {
    return current;
  }

  return current;
};

// Move on the map from x, y and return the new position
const move = (map, inX, inY, distance, facing) => {
  let x = inX;
  let y = inY;
  const direction = facing === 2 || facing === 3 ? -1 : 1;
  const moveX = facing === 0 || facing === 2;

  // console.log('Move', {moveX, direction, distance});
  for (let i = 0; i < distance; i += 1) {
    // left right
    if (moveX) {
      x = moveInArray(map.mapRows[y], x, direction);
    } else {
      // console.log('Move y', x, map.mapCols[x], direction);
      y = moveInArray(map.mapCols[x], y, direction);
    }
  }

  return [x, y];
};

const processDirections = (data) => {
  const { map, moves, start } = data;
  let facing = 0;

  let [x, y] = start;

  moves.forEach(([dist, rotate]) => {
    [x, y] = move(map, x, y, parseInt(dist, 10), facing);
    // console.log('Move', {dist, rotate});
    // console.log(loop, {x, y});
    if (rotate) {
      // console.log('Rotate', rotate, facing);
      facing = getFacing(facing, rotate);
      // console.log('Facing now', facing);
    }
  });

  return [x, y, facing];
};

const process = (input) => {
  const data = setupData(input);
  const [x, y, facing] = processDirections(data);

  const res = 1000 * (y + 1) + 4 * (x + 1) + facing;
  return res;
};

module.exports = {
  process,
  moveInArray,
};
