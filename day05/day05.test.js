const { getFile } = require('../utils');

const { day05, buildStack } = require('./day05');

// Read the files
const example = getFile('./day05/example');
const input = getFile('./day05/input');

const exampleStack = [
  'NZ',
  'DCM',
  'P',
].map((i) => i.split(''));

const inputStack = buildStack(input);

describe('Day 5', () => {
  test('Build stack', () => {
    expect(buildStack(example)).toStrictEqual(exampleStack);
  });

  test('Example', () => {
    expect(day05(example, exampleStack)).toBe('CMZ');
  });

  test('Example 2', () => {
    expect(day05(example, exampleStack, true)).toBe('MCD');
  });

  test('Part 1', () => {
    expect(day05(input, inputStack)).toBe('CWMTGHBDW');
  });

  test('Part 2', () => {
    expect(day05(input, inputStack, true)).toBe('SSCGWJCRB');
  });
});
