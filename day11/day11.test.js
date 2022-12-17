const { getFileRaw } = require('../utils');

const { day11 } = require('./day11');

// Read the files
const input = getFileRaw('./day11/input');
const example = getFileRaw('./day11/example');

describe('Day 11', () => {
  test('Example', () => {
    const { monkeyBusiness } = day11(example, 20);
    expect(monkeyBusiness).toBe(10605);
  });

  test('Example - Part2', () => {
    const { monkeyBusiness } = day11(example, 10000, true);
    expect(monkeyBusiness).toBe(2713310158);
  });

  test('Part 1', () => {
    const { monkeyBusiness } = day11(input, 20);
    expect(monkeyBusiness).toBe(50172);
  });

  test('Part 1', () => {
    const { monkeyBusiness } = day11(input, 10000, true);
    expect(monkeyBusiness).toBe(11614682178);
  });
});
