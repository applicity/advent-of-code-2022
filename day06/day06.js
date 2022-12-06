const isUnique = (check) => check.length === [...new Set(check)].length;

// Input is a string.
const day06 = (input, p2) => {
  const uniqueLength = p2 ? 14 : 4;
  const chars = input.split('');
  const len = input.length;
  let res = false;

  for (let i = uniqueLength; i < len; i += 1) {
    const check = chars.slice(i - uniqueLength, i);
    if (isUnique(check)) {
      res = i;
      break;
    }
  }
  return res;
};

module.exports = {
  day06,
  isUnique,
};
