const { getFile } = require('../utils');

const { day16, day16p2 } = require('./day16');

// Read the files
const input = getFile('./day16/input');
const example = getFile('./day16/example');

describe('Day 16', () => {
  test('Example', () => {
    expect(day16(example)).toBe(1651);
  });

  test('Example - Part 2', () => {
    expect(day16p2(example)).toBe(1707);
  });

  test('Part 1', () => {
    expect(day16(input)).toBe(2077);
  });

  test.skip('Part 2', () => {
    expect(day16p2(input)).toBe(2741);
  });
});
