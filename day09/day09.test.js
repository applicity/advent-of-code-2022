const { getFile } = require('../utils');

const { day09, updateHead } = require('./day09');

// Read the files
const input = getFile('./day09/input');
const example = getFile('./day09/example');
const example2 = getFile('./day09/example2');

describe('Day 9', () => {
  test('Example', () => {
    const res = day09(example);
    expect(res).toBe(13);
  });

  test('Example 2', () => {
    const res = day09(example2, 10);
    expect(res).toBe(36);
  });

  test('updateHead', () => {
    expect(updateHead([0, 0], 'U')).toStrictEqual([1, 0]);
    expect(updateHead([0, 0], 'R')).toStrictEqual([0, 1]);
    expect(updateHead([1, 1], 'L')).toStrictEqual([1, 0]);
    expect(updateHead([1, 1], 'D')).toStrictEqual([0, 1]);
  });

  test('Part 1', () => {
    const res = day09(input);
    expect(res).toBe(5981);
  });

  test('Part 2', () => {
    const res = day09(input, 10);
    expect(res).toBe(2352);
  });

  // test('Part 2', () => {
  //   const { score } = day08(input);
  //   expect(score).toBe(496650);
  // });
});
