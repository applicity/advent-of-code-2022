const half = (input) => {
  const middle = Math.floor(input.length / 2);
  return [input.substr(0, middle), input.substr(middle)];
};

const itemValue = (item) => {
  let code = item.charCodeAt(0);

  if (code >= 97) {
    code -= 96;
  } else {
    code -= 64;
    code += 26;
  }

  return code;
};

const findIntersection = (a, b) => {
  const arrB = b.split('');
  return [...new Set(...a.split('').filter((v) => arrB.includes(v)))];
};

const chunkArray = (array, chunkSize) => Array(Math.ceil(array.length / chunkSize))
  .fill()
  .map((_, index) => index * chunkSize)
  .map((begin) => array.slice(begin, begin + chunkSize));

const mapIntersection = (v) => findIntersection(v[0], v[1]);

const findMultiIntersection = (values) => [
  ...new Set(
    values
      .map((v) => v.split(''))
      .reduce((a, b) => b.filter(Set.prototype.has, new Set(a))),
  ),
];

const engine = (input, p2) => {
  if (p2) {
    const res = chunkArray(input, 3)
      .map(findMultiIntersection)
      .map((v) => itemValue(v[0]))
      .reduce((a, c) => a + c, 0);
    return res;
  }
  const res = input
    .map(half)
    .map(mapIntersection)
    .map((v) => itemValue(v[0]))

    .reduce((a, c) => a + c, 0);

  return res;
};

module.exports = {
  engine,
  half,
  itemValue,
  findIntersection,
  chunkArray,
  findMultiIntersection,
};
