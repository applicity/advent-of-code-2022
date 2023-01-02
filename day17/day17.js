/* eslint-disable no-bitwise */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
const DEBUG = false;

const shapes = [
  // ####
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  // .#.
  // ###
  // .#.
  [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]],
  // ..#
  // ..#
  // ###
  [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
  // #
  // #
  // #
  // #
  [[0, 0], [1, 0], [2, 0], [3, 0]],
  // ##
  // ##
  [[0, 0], [0, 1], [1, 0], [1, 1]],
].map((s) => s.map((p) => [p[1], p[0]]));

const setupData = (input) => {
  const jets = input.split('');

  const jetLength = jets.length;

  return { jets, jetLength };
};

const move = (shape, x, y) => {
  const newShape = shape.map((i) => [i[0] + x, i[1] + y]);
  return newShape;
};

const extents = (shape, direction) => {
  const min = Math.min(...shape.map((i) => i[direction]));
  const max = Math.max(...shape.map((i) => i[direction]));
  return { min, max };
};

const arrayIntersects = (a, nextPos) => {
  let found = false;

  nextPos.forEach((p) => {
    if (!found) {
      if (a.includes(`${p[0]}:${p[1]}`)) {
        found = true;
      }
    }
  });
  return found;
};

const displayTower = (tower, label, nextPos = []) => {
  if (!DEBUG) return;

  let max = 0;
  const display = [];

  const combined = [...tower, ...nextPos.map((p) => p.join(':'))];
  combined.filter(Boolean).forEach((t) => {
    const [x, y] = t.split(':').map((v) => parseInt(v, 10));
    if (y > max) max = y;
    // console.log(x,y);
    // console.log(t);
    if (!display[y]) {
      display[y] = [];
      for (let z = 0; z < 7; z += 1) {
        display[y][z] = '.';
      }
    }
    display[y][x] = '#';
  });

  // eslint-disable-next-line no-console
  console.log(`${label}\n${display.reverse().map((r) => r.join('')).join('\n')}`);
};

const gameKey = (shape, jet, tower) => {
  let gameState = [];

  tower.forEach((p) => {
    const [x, y] = p.split(':').map((q) => parseInt(q, 10));
    gameState[x] = Math.max(y, gameState[x] || 0);
  });
  const base = Math.max(...gameState);

  gameState = gameState.map((x) => base - x);
  // console.log('Game state', gameState);

  return [shape, jet, ...gameState].join(':');
};

// Shapes start 2 from the left and 3 from the floor.
const issueShape = (no, floor) => move(shapes[no], 2, floor + 4);

const part1 = (input, loops = 2022, adj = 0) => {
  const { jets, jetLength } = setupData(input);
  const states = {};

  let tower = [];

  let shapePos = 0;
  let floor = -1;
  let current = issueShape(shapePos, floor);
  let jetPos = 0;

  const maxLoop = loops === 2022 ? 5000 : 4000;
  let i = 0;
  const heights = {};
  let firstLoop;

  while (i < maxLoop) {
    // console.log(i, !(i % 1000));
    let nextPos;
    // move the shape
    if (jets[jetPos] === '>') {
      // console.log('Right');
      nextPos = move(current, 1, 0);
    }

    if (jets[jetPos] === '<') {
      // console.log('Left');
      nextPos = move(current, -1, 0);
    }
    jetPos += 1;

    if (jetPos > jetLength - 1) {
      jetPos = 0;
    }

    const { min, max } = extents(nextPos, 0);

    if (min >= 0 && max <= 6 && !arrayIntersects(tower, nextPos)) {
      current = nextPos;
    }

    // Check if we can move down.
    nextPos = move(current, 0, -1);

    const { min: vMin } = extents(nextPos, 1);

    // If we touch any other element then we need to stop moving.
    if (vMin < 0 || arrayIntersects(tower, nextPos)) {
      tower.push(...current.map((p) => p.join(':')));

      const stateKey = gameKey(shapePos, jetPos, tower);

      if (!states[stateKey]) {
        states[stateKey] = [];
      } else if (!firstLoop) {
        firstLoop = stateKey;
      }

      const { max: cMax } = extents(current, 1);
      floor = Math.max(cMax, floor, 0);

      states[stateKey].push([i, floor]);
      heights[i] = floor;

      // console.log('Stop issue new shape', floor);
      shapePos += 1;
      if (shapePos > 4) {
        shapePos = 0;
      }

      // console.log('issueShape', shapePos, floor);
      current = issueShape(shapePos, floor);

      i += 1;
      displayTower(tower, 'Issued new shape', current);
      // Keep the end of the tower only for performance reasons.
      if (tower.length > 100) {
        tower = tower.slice(-100);
      }
    } else {
      current = nextPos;
    }
  }
  displayTower(tower, 'Final', current);

  // Work out the loop length from the loop match
  const loopStates = states[firstLoop].slice(0, 2);

  const loopLength = loopStates[1][0] - loopStates[0][0];
  const heightPerLoop = loopStates[1][1] - loopStates[0][1];
  const firstLoopPos = loopStates[0][0];
  const initialHeight = heights[firstLoopPos - 1];
  const fullLoops = Math.floor((loops - firstLoopPos) / loopLength);
  const remainingLoops = (loops - firstLoopPos) % loopLength;
  const lastBit = heights[firstLoopPos + loopLength + remainingLoops + 1]
    - heights[firstLoopPos + loopLength + 1];

  const res = initialHeight + (fullLoops * heightPerLoop) + lastBit + (fullLoops ? 0 : -1);

  return res + 1 + adj;
};

module.exports = {
  part1,
  arrayIntersects,
};
