const { getFile } = require('../utils');

const { process } = require('./day21');

// Read the files
const input = getFile('./day21/input');
const example = getFile('./day21/example');

describe('Day 21', () => {
  test('Example', () => {
    expect(process(example)).toBe(152);
  });

  test('Example - Part 2', () => {
    expect(process(example, true)).toBe(301);
  });

  test('Part 1', () => {
    expect(process(input)).toBe(145167969204648);
  });

  test('Part 2', () => {
    expect(process(input, true)).toBe(3330805295850);
  });
});
