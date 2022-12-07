const { getFile } = require('../utils');

const {

  day07, cd, pwd, parent,

} = require('./day07');

// Read the files
const input = getFile('./day07/input');
const example = getFile('./day07/example');

describe('Day 7', () => {
  test('cd', () => {
    let context = [];
    context = cd(context, '$ cd /');
    expect(pwd(context)).toBe('/');
    context = cd(context, '$ cd foo');
    expect(pwd(context)).toBe('/foo');
    context = cd(context, '$ cd bar');
    expect(pwd(context)).toBe('/foo/bar');
    context = cd(context, '$ cd ..');
    expect(pwd(context)).toBe('/foo');
  });

  test('parent', () => {
    expect(parent('/a/e')).toBe('/a');
    expect(parent('/a/e/g')).toBe('/a/e');
    expect(parent('/a')).toBe('/');
    expect(parent('/')).toBe(false);
  });

  test('Example', () => {
    expect(day07(example)).toBe(95437);
  });

  test('Example 2', () => {
    expect(day07(example, true)).toBe(24933642);
  });

  test('Part 1', () => {
    expect(day07(input)).toBe(1667443);
  });

  test('Part 2', () => {
    expect(day07(input, true)).toBe(8998590);
  });
});
