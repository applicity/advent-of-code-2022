const { getFile } = require('../utils');

const { day15, day15part2, combineRanges } = require('./day15');

// Read the files
const input = getFile('./day15/input');
const example = getFile('./day15/example');

describe('Day 15', () => {
  test('Example', () => {
    expect(day15(example, 10)).toBe(26);
  });

  test('Example - Part 2', () => {
    expect(day15part2(example, 20)).toBe(56000011);
  });

  test('combine ranges', () => {
    expect(combineRanges([[10, 20], [19, 30]])).toStrictEqual([[10, 30]]);
    expect(combineRanges([[10, 20], [19, 30], [40, 50]])).toStrictEqual([[10, 30], [40, 50]]);
    expect(combineRanges([[0, 3], [3, 13], [11, 13], [15, 17], [15, 20]]))
      .toStrictEqual([[0, 13], [15, 20]]);

    expect(
      combineRanges([
        [0, 2],
        [1, 3],
        [4, 12],
        [10, 14],
        [14, 20],
      ]),
    ).toStrictEqual([[0, 20]]);
  });

  test('Part 1', () => {
    expect(day15(input, 2000000)).toBe(4883971);
  });

  test('Part 2', () => {
    expect(day15part2(input, 4000000)).toBe(12691026767556);
  });

  // test('Part 2', () => {
  //   expect(day15(input, true)).toBe(28744);
  // });
});
