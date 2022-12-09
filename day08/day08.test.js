const { getFile } = require('../utils');

const { day08, isVisible, scenicScore } = require('./day08');

// Read the files
const input = getFile('./day08/input');
const example = getFile('./day08/example');

describe('Day 8', () => {
  test('Example', () => {
    const { visible, score } = day08(example);
    expect(visible).toBe(21);
    expect(score).toBe(8);
  });

  test('isVisible', () => {
    expect(isVisible(0, '1101'.split(''))).toBe(true);
    expect(isVisible(3, '1101'.split(''))).toBe(true);
    expect(isVisible(1, '1101'.split(''))).toBe(false);
    expect(isVisible(2, '1101'.split(''))).toBe(false);
  });

  test('scenicScore', () => {
    expect(scenicScore(2, '33549'.split(''))).toBe(4);
    expect(scenicScore(3, '35353'.split(''))).toBe(2);
  });

  test('Part 1', () => {
    const { visible } = day08(input);

    expect(visible).toBe(1703);
  });

  test('Part 2', () => {
    const { score } = day08(input);
    expect(score).toBe(496650);
  });
});
