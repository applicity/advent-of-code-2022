const fs = require('fs');

const getFile = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n').filter(Boolean);

const clone = (input) => JSON.parse(JSON.stringify(input));

module.exports = { getFile, clone };
