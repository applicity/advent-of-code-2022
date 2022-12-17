const { getFile } = require('../utils');

const { day12 } = require('./day12');

// Read the files
const input = getFile('./day12/input');
const example = getFile('./day12/example');

describe('Day 12', () => {
  test('Example', () => {
    expect(day12(example)).toBe(31);
  });

  test('Example - Part 2', () => {
    expect(day12(example, true)).toBe(29);
  });

  test('Part 1', () => {
    expect(day12(input)).toBe(534);
  });

  test('Part 2', () => {
    expect(day12(input, true)).toBe(525);
  });
});
