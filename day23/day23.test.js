const { getFile } = require('../utils');

const { process } = require('./day23');

// Read the files
const input = getFile('./day23/input');
const example = getFile('./day23/example');

describe('Day 23', () => {
  test('Example', () => {
    expect(process(example, false)).toBe(110);
  });

  test('Example - Part 2', () => {
    expect(process(example, true)).toBe(20);
  });

  test('Part 1', () => {
    expect(process(input)).toBe(3882);
  });

  test.skip('Part 2', () => {
    expect(process(input, true)).toBe(1116);
  });
});
