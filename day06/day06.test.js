const { getFile } = require('../utils');

const { day06, isUnique } = require('./day06');

// Fead the files
const input = getFile('./day06/input');

describe('Day 6', () => {
  test('isUnique', () => {
    expect(isUnique(['b', 'v', 'w', 'b'])).toBe(false);
    expect(isUnique(['b', 'v', 'w', 'c'])).toBe(true);
  });

  test('Examples', () => {
    expect(day06('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
    expect(day06('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
    expect(day06('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
    expect(day06('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
    expect(day06('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
  });

  test('Examples 2', () => {
    expect(day06('mjqjpqmgbljsphdztnvjfqwrcgsmlb', true)).toBe(19);
    expect(day06('bvwbjplbgvbhsrlpgdmjqwftvncz', true)).toBe(23);
    expect(day06('nppdvjthqldpwncqszvftbrmjlhg', true)).toBe(23);
    expect(day06('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', true)).toBe(29);
    expect(day06('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', true)).toBe(26);
  });

  // test('Example 2', () => {
  //   expect(day05(example, exampleStack, true)).toBe('MCD');
  // });

  test('Part 1', () => {
    expect(day06(input[0])).toBe(1238);
  });

  test('Part 1', () => {
    expect(day06(input[0], true)).toBe(3037);
  });
});
