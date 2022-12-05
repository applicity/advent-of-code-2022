const fs = require('fs');

const text = fs.readFileSync('day01/input', 'utf8');

// Split into chunks then reduce the values.  Finally get the max.
const p1 = () => Math.max(
  ...text.split('\n\n').map((v) => v
    .split('\n')
    .filter(Boolean)
    .reduce((a, c) => a + parseInt(c, 10), 0)),
);

module.exports = p1;
