const setupData = (input) => {
  const cycles = input
    .map((c) => {
      // convert addx to a noop and the original command
      if (c.startsWith('addx')) {
        return ['noop', c];
      }
      return c;
    })
    .flat();

  return cycles;
};

const showDisplay = (display) => display.map((r) => r.join('')).join('\n');

// The pixel is active if col is inside the sprite.
// The center of the sprint is x and it's 3 pixels wide, x - 1 .. x + 1
const isActive = (x, col) => (col >= x - 1 && col <= x + 1);

const getPosition = (i) => {
  const col = i % 40;
  const row = parseInt(i / 40, 10);

  return { row, col };
};

const day10 = (input) => {
  const display = [...Array(6).keys()].map(() => [...Array(40).keys()].map(() => '.'));
  const res = [1];
  let x = 1;

  setupData(input)
    .forEach((op, i) => {
      const { row, col } = getPosition(i);
      if (isActive(x, col)) {
        display[row][col] = '#';
      }

      if (op.startsWith('addx')) {
        const add = parseInt(op.split(' ')[1], 10);
        x += add;
      }

      res[i + 1] = x;
    });

  let sum = 0;
  for (let i = 20; i < res.length; i += 40) {
    sum += i * res[i - 1];
  }
  return { sum, display: showDisplay(display) };
};

module.exports = {
  day10,
};
