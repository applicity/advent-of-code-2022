const { getFile } = require('../utils');
const { day04, isContained, isOverlap } = require('./day04');

// Read the files
const example = getFile('./day04/example');
const input = getFile('./day04/input');

describe('Day 4', () => {
  test('Is Contained', () => {
    expect(isContained([2, 3], [1, 6])).toBe(true);
    expect(isContained([1, 2], [2, 3])).toBe(false);

    expect(isContained([98, 99], [1, 98])).toBe(false);
  });

  test('Is overlap', () => {
    expect(isOverlap([2, 4], [6, 8])).toBe(false);
    expect(isOverlap([5, 7], [7, 9])).toBe(true);
    expect(isOverlap([2, 8], [3, 7])).toBe(true);
  });

  test('Example', () => {
    expect(day04(example)).toBe(2);
  });

  test('Part1', () => {
    expect(day04(input)).toBe(536);
  });

  test('Part2', () => {
    expect(day04(input, true)).toBe(845);
  });
});
