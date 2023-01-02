const { getFileRaw } = require('../utils');

const { part1, arrayIntersects } = require('./day17');

// Read the files
const input = getFileRaw('./day17/input');
const example = getFileRaw('./day17/example');

describe('Day 17', () => {
  test('Array interesct', () => {
    const a = ['0:1', '0:2'];
    const b = [[0, 2], [1, 2]];

    const res = arrayIntersects(a, b);
    expect(res).toBe(true);
  });

  test('Example', () => {
    // expect(part1(example, 54)).toBe(3068);
    expect(part1(example, 2022)).toBe(3068);
  });

  test('Example - Part2', () => {
    // expect(part1(example, 54)).toBe(3068);
    expect(part1(example, 1000000000000)).toBe(1514285714288);
  });

  test('Part 1', () => {
    expect(part1(input, 2022)).toBe(3206);
  });

  test('Part2', () => {
    // expect(part1(example, 54)).toBe(3068);
    expect(part1(input, 1000000000000, 1)).toBe(1602881844347);
  });
});
