const { getFileRaw } = require('../utils');

const { process, moveInArray } = require('./day22');

// Read the files
const input = getFileRaw('./day22/input');
const example = getFileRaw('./day22/example');

describe('Day 22', () => {
  test('Example', () => {
    expect(process(example)).toBe(6032);
  });

  test.skip('Example - Part 2', () => {
    expect(process(example, true)).toBe(5031);
  });

  test('Moves', () => {
    const arr1 = [' ', ' ', '.', '.', '.'];
    expect(moveInArray(arr1, 2, 1)).toBe(3);
    expect(moveInArray(arr1, 4, 1)).toBe(2);
  });

  test('Moves with walls', () => {
    const arr1 = [' ', '#', '.', '.', '.'];
    expect(moveInArray(arr1, 2, 1)).toBe(3);
    expect(moveInArray(arr1, 4, 1)).toBe(4);
    const arr2 = [' ', '#', '.', '.', '.'];
    expect(moveInArray(arr2, 2, -1)).toBe(2);
  });

  test('Moves with negative direction', () => {
    const arr = [' ', ' ', '.', '.', '.'];
    expect(moveInArray(arr, 2, -1)).toBe(4);
    expect(moveInArray(arr, 4, -1)).toBe(3);
    const arr2 = [' ', ' ', '.', '.', '.', ' '];
    expect(moveInArray(arr2, 2, -1)).toBe(4);
  });

  test('Part 1', () => {
    expect(process(input)).toBe(146092);
  });

  // test('Part 2', () => {
  //   expect(process(input, true)).toBe(3330805295850);
  // });
});
