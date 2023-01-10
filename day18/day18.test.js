const { getFile } = require('../utils');

const { part1 } = require('./day18');

// Read the files
const input = getFile('./day18/input');
const example = getFile('./day18/example');

describe('Day 18', () => {
  test('Example', () => {
    expect(part1(example)).toBe(64);
  });

  test('Example - Part 2', () => {
    expect(part1(example, true)).toBe(58);
  });

  test('Part 1', () => {
    expect(part1(input)).toBe(4242);
  });

  test('Part 2', () => {
    expect(part1(input, true)).toBe(2428);
  });
});
