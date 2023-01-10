/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
const setupData = (input) => {
  const grid = input.map((r) => r.split(''));
  const offset = 0;
  const elves = [];
  grid.forEach((r, y) => {
    r.forEach((e, x) => {
      if (e === '#') {
        elves.push([x + offset, y + offset]);
      }
    });
  });
  return { elves };
};

const possibleMoves = (elf) => {
  const nw = [elf[0] - 1, elf[1] - 1];
  const nn = [elf[0], elf[1] - 1];
  const ne = [elf[0] + 1, elf[1] - 1];
  const ww = [elf[0] - 1, elf[1]];
  const ee = [elf[0] + 1, elf[1]];
  const sw = [elf[0] - 1, elf[1] + 1];
  const ss = [elf[0], elf[1] + 1];
  const se = [elf[0] + 1, elf[1] + 1];

  return {
    nw, nn, ne, ww, ee, sw, ss, se,
  };
};

const directions = [
  ['nn', 'ne', 'nw'],
  ['ss', 'se', 'sw'],
  ['ww', 'nw', 'sw'],
  ['ee', 'ne', 'se'],
];

const isTrue = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i]) return true;
  }
  return false;
};

const hasElf = (state, pos) => {
  const [x, y] = pos;
  for (let i = 0; i < state.length; i += 1) {
    const { elf } = state[i];
    if (elf[0] === x && elf[1] === y) {
      return true;
    }
  }

  return false;
};

const hasDuplicate = (state, pos, index) => {
  const [x, y] = pos;
  for (let i = 0; i < state.length; i += 1) {
    const { newPos } = state[i];
    if (newPos[0] === x && newPos[1] === y && i !== index) {
      return true;
    }
  }
  return false;
};

const process = (input, part2 = false) => {
  const { elves } = setupData(input);
  let dStart = 0;

  let state = elves.map((e) => ({ elf: e }));

  for (let rounds = 0; rounds < (part2 ? Infinity : 10); rounds += 1) {
    state = state.map((e) => {
      const { elf } = e;
      let newPos = elf;
      const moves = possibleMoves(elf);
      const positions = {};
      Object.keys(moves).forEach((k) => {
        positions[k] = hasElf(state, moves[k]);
      });

      let move = true;

      // Check if there are any elves in the surrounding cells.
      if (!isTrue(Object.values(positions))) {
        move = false;
      }

      let proposal = null;
      // If we can move work out where 2.
      if (move) {
        for (let i = 0; i < 4; i += 1) {
          if (proposal === null) {
            const dir = directions[(i + dStart) % 4];
            if (!isTrue(dir.map((d) => positions[d]))) {
              [proposal] = dir;
              break;
            }
          }
        }
        if (!proposal) {
          move = false;
        } else {
          newPos = moves[proposal];
        }
      }

      return { elf, newPos, move };
    });

    state = state.map((e, j) => {
      if (e.move && hasDuplicate(state, e.newPos, j)) {
        e.move = false;
      }

      return { elf: e.move ? e.newPos : e.elf, move: e.move };
    });

    dStart = (dStart + 1) % 4;

    const moves = state.filter((e) => e.move).length;
    if (!moves) {
      return rounds + 1;
    }
  }

  const x = state.map((e) => e.elf[0]);
  const y = state.map((e) => e.elf[1]);

  const minX = Math.min(...x);
  const minY = Math.min(...y);
  const maxX = Math.max(...x);
  const maxY = Math.max(...y);

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  // console.log({moves, minX, minY, maxX, maxY, width, height, elfCount: elves.length});

  const res = (width * height) - elves.length;

  return res;
};

module.exports = {
  process,
};
