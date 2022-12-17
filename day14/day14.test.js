const { getFile } = require('../utils');

const { day14 } = require('./day14');

// Read the files
const input = getFile('./day14/input');
const example = getFile('./day14/example');

describe('Day 14', () => {
  test('Example', () => {
    expect(day14(example)).toBe(24);
  });

  test('Example - Part 2', () => {
    expect(day14(example, true)).toBe(93);
  });

  test('Part 1', () => {
    expect(day14(input)).toBe(862);
  });

  test('Part 2', () => {
    expect(day14(input, true)).toBe(28744);
  });
});
