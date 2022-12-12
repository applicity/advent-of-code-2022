const { getFile } = require('../utils');

const { day10 } = require('./day10');

const expectedDisplay = `####.###...##..###..####.###...##....##.
#....#..#.#..#.#..#.#....#..#.#..#....#.
###..#..#.#....#..#.###..#..#.#.......#.
#....###..#....###..#....###..#.......#.
#....#.#..#..#.#.#..#....#....#..#.#..#.
####.#..#..##..#..#.####.#.....##...##..`;

// Read the files
const input = getFile('./day10/input');
const example = getFile('./day10/example');

describe('Day 10', () => {
  test('Example', () => {
    const { sum } = day10(example);
    expect(sum).toBe(13140);
  });

  test('Part 1', () => {
    const { sum, display } = day10(input);
    expect(sum).toBe(11720);
    expect(display).toBe(expectedDisplay);
  });
});
