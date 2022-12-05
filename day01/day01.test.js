const p1 = require('./p1');
const p2 = require('./p2');

describe('Day 01', () => {
  test('Part 1', () => {
    const res = p1();
    expect(res).toBe(70613);
  });

  test('Part 2', () => {
    const res = p2();
    expect(res).toBe(205805);
  });
});
