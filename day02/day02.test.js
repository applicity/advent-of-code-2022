const { getFile } = require('../utils');
const { engine, chooseResult } = require('./day02');

const exampleStrategy = `A Y
B X
C Z`.split('\n');

test('Example', () => {
  expect(engine(exampleStrategy)).toBe(15);
});

test('Example 2', () => {
  expect(engine(exampleStrategy, true)).toBe(12);
});

test('Choose result', () => {
  expect(chooseResult(['A', 'X'])).toStrictEqual(['A', 'C']);
  expect(chooseResult(['A', 'Y'])).toStrictEqual(['A', 'A']);
  expect(chooseResult(['A', 'Z'])).toStrictEqual(['A', 'B']);
});

test('Part 1', () => {
  const strategy = getFile('./day02/input');
  expect(engine(strategy)).toBe(9177);
});

test('Part 2', () => {
  const strategy = getFile('./day02/input');
  expect(engine(strategy, true)).toBe(12111);
});
