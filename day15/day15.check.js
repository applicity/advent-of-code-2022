const { getFile } = require('../utils');
const { day15part2 } = require('./day15');

// Read the files
const input = getFile('./day15/input');
// eslint-disable-next-line no-console
console.log('Part2', day15part2(input, 4000000));
