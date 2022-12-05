const fs = require('fs');

const text = fs.readFileSync('day01/input', 'utf8');

const p2 = () => text
  .split('\n\n')
  .map((v) => v
    .split('\n')
    .filter(Boolean)
    .reduce((a, c) => a + parseInt(c, 10), 0))
  // Reverse sort
  .sort((a, b) => b - a)
  // First 3
  .slice(0, 3)
  // Sum
  .reduce((a, c) => a + c, 0);

module.exports = p2;
