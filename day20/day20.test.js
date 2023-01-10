const { getFile } = require('../utils');

const { process } = require('./day20');

const encryptionKey = 811589153;
const loops = 10;

// Read the files
const input = getFile('./day20/input');
const example = getFile('./day20/example');

describe('Day 20', () => {
  test('Example', () => {
    expect(process(example)).toBe(3);
  });

  test('Example - Part2', () => {
    expect(process(example, encryptionKey, loops)).toBe(1623178306);
  });
  // test('Example - Part 2', () => {
  //   expect(part1(example, true)).toBe(58);
  // });

  test('Part 1', () => {
    expect(process(input)).toBe(3466);
  });

  test('Part 12', () => {
    expect(process(input, encryptionKey, loops)).toBe(9995532008348);
  });

  // test('Part 2', () => {
  //   expect(part1(input, true)).toBe(26460);
  // });
});
