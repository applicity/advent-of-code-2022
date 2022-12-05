const isContained = (a, b) => {
  if (a[0] >= b[0] && a[1] <= b[1]) return true;
  if (b[0] >= a[0] && b[1] <= a[1]) return true;
  return false;
};

const isOverlap = (a, b) => isContained(a, [b[0], b[0]])
  || isContained(a, [b[1], b[1]])
  || isContained([a[0], a[0]], b)
  || isContained([a[1], a[1]], b);

const day04 = (input, p2) => {
  const pairs = input
    .map((v) => v.split(',').map((r) => r.split('-').map((n) => parseInt(n, 10))));

  let count = 0;

  // console.log(pairs);
  pairs.forEach((p) => {
    if (p2 ? isOverlap(p[0], p[1]) : isContained(p[0], p[1])) {
      count += 1;
    }
  });
  return count;
};

module.exports = {
  day04,
  isContained,
  isOverlap,
};
