const { getFile } = require('../utils');
const engine = require('./day02');

const exampleStrategy = `A Y
B X
C Z`.split('\n');

test('Example', () => {
  expect(engine(exampleStrategy)).toBe(15);
});

test('Example 2', () => {
  expect(engine(exampleStrategy, true)).toBe(12);
});

test('Part 1', () => {
  const strategy = getFile('./day02/input');
  expect(engine(strategy)).toBe(9177);
});

test('Part 2', () => {
  const strategy = getFile('./day02/input');
  expect(engine(strategy, true)).toBe(12111);
});
