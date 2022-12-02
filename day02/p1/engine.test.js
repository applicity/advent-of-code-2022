const fs = require('fs');
const engine = require('./engine');

test('Example', () => {
  const strategy = `A Y
B X
C Z`;

  expect(engine(strategy)).toBe(15);
});

test('Example 2', () => {
  const strategy = `A Y
B X
C Z`;

  expect(engine(strategy, true)).toBe(12);
});

test('Input', () => {
  const strategy = fs.readFileSync('./day02/input', 'utf8');
  expect(engine(strategy)).toBe(9177);
});

test('Input', () => {
  const strategy = fs.readFileSync('./day02/input', 'utf8');
  expect(engine(strategy, true)).toBe(12111);
});
