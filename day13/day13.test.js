const { getFileChunks } = require('../utils');

const { day13, day13p2, correct } = require('./day13');

// Read the files
const input = getFileChunks('./day13/input');
const example = getFileChunks('./day13/example');

describe('Day 13', () => {
  test('Correct', () => {
    // Pair 1
    expect(correct([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toBe(true);
    // Pair 2
    expect(correct([[1], [2, 3, 4]], [[1], 4])).toBe(true);
    // Pair 3
    expect(correct([9], [[8, 7, 6]])).toBe(false);
    // Pair 4
    expect(correct([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toBe(true);
    // Pair 5
    expect(correct([7, 7, 7, 7], [7, 7, 7])).toBe(false);
    // Pair 6
    expect(correct([], [3])).toBe(true);
    // Pair 7
    expect(correct([[[]]], [[]])).toBe(false);
    // Pair 8
    expect(correct([1, [2, [3, [4, [5, 6, 7]]]], 8, 9], [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]))
      .toBe(false);
  });

  test('Rules', () => {
    expect(correct([1, 1], [2, 2])).toBe(true);
    expect(correct([2, 2], [1, 1])).toBe(false);
    expect(correct([1, [1]], [1, [1, 1]])).toBe(true);
    expect(correct([1, [1, 1]], [1, [1]])).toBe(false);
  });

  test('Example', () => {
    expect(day13(example)).toBe(13);
  });

  test('Example - Part 2', () => {
    expect(day13p2(example.join('\n'))).toBe(140);
  });

  test('Part 1', () => {
    expect(day13(input)).toBe(5882);
  });

  test('Part 2', () => {
    expect(day13p2(input.join('\n'), true)).toBe(24948);
  });
});
