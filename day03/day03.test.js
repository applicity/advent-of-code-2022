const { getFile } = require('../utils');

const {
  engine,
  half,
  itemValue,
  findIntersection,
  chunkArray,
  findMultiIntersection,
} = require('./day03');

const exampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split('\n');

test('Half', () => {
  expect(half('abcd')).toStrictEqual(['ab', 'cd']);

  expect(half(exampleInput[0])).toStrictEqual(['vJrwpWtwJgWr', 'hcsFMMfFFhFp']);
});

test('Item value', () => {
  expect(itemValue('A')).toBe(27);
  expect(itemValue('Z')).toBe(52);
  expect(itemValue('a')).toBe(1);
  expect(itemValue('z')).toBe(26);
});

test('Intersection', () => {
  expect(findIntersection('AB', 'BC')).toStrictEqual(['B']);
  expect(findIntersection('wMqvLMZHhHMvwLH', 'jbvcjnnSBnvTQFn')).toStrictEqual([
    'v',
  ]);
});

test('Chunk array', () => {
  const res = chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
  expect(res).toStrictEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
});

test('findMultiIntersection', () => {
  const check = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
  ];

  const res = findMultiIntersection(check);

  expect(res).toStrictEqual(['r']);
});

test('findMultiIntersection2', () => {
  const check = [
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
  ];

  const res = findMultiIntersection(check);

  expect(res).toStrictEqual(['Z']);
});

test('Example 1', () => {
  expect(engine(exampleInput)).toBe(157);
});

test('Example 2', () => {
  expect(engine(exampleInput, true)).toBe(70);
});

test('Part 1', () => {
  const input = getFile('./day03/input');
  expect(engine(input)).toBe(8105);
});

test('Part 2', () => {
  const input = getFile('./day03/input');
  expect(engine(input, true)).toBe(2363);
});
