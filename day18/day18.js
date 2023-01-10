/* eslint-disable no-continue */

const makeKey = (x, y, z) => [x, y, z].join(':');

const setupData = (input) => {
  const points = input.map((p) => p.split(',').map((j) => parseInt(j, 10)));

  const pointSet = new Set();

  points.forEach(([x, y, z]) => {
    pointSet.add(makeKey(x, y, z));
  });

  return { points, pointSet };
};

const outside = new Set();
const inside = new Set();

// dfs - brute force looking for neighbours
const isOutside = (pointSet, x, y, z) => {
  const key = makeKey(x, y, z);
  if (outside.has(key)) {
    return true;
  }
  if (inside.has(key)) {
    return false;
  }

  const seen = new Set();
  const queue = [key];
  while (queue.length > 0) {
    const qKey = queue.shift();
    const [xq, yq, zq] = qKey.split(':').map((q) => parseInt(q, 10));

    if (pointSet.has(qKey)) {
      continue;
    }
    if (seen.has(qKey)) {
      continue;
    }
    seen.add(qKey);

    // If we have looked at a lot of cells then consider the cell outside
    if (seen.size > 1500) {
      seen.forEach((s) => {
        outside.add(s);
      });
      return true;
    }

    // Look at the neighbours
    queue.push(makeKey(xq + 1, yq, zq));
    queue.push(makeKey(xq - 1, yq, zq));
    queue.push(makeKey(xq, yq + 1, zq));
    queue.push(makeKey(xq, yq - 1, zq));
    queue.push(makeKey(xq, yq, zq + 1));
    queue.push(makeKey(xq, yq, zq - 1));
  }
  seen.forEach((s) => {
    inside.add(s);
  });

  return false;
};

const part1 = (input, part2 = false) => {
  const { pointSet } = setupData(input);

  outside.clear();
  inside.clear();

  let answer = 0;

  Array.from(pointSet).forEach((c) => {
    const [x, y, z] = c.split(':').map((i) => parseInt(i, 10));
    if (part2 === false) {
      if (!pointSet.has(makeKey(x + 1, y, z))) {
        answer += 1;
      }
      if (!pointSet.has(makeKey(x - 1, y, z))) {
        answer += 1;
      }
      if (!pointSet.has(makeKey(x, y + 1, z))) {
        answer += 1;
      }
      if (!pointSet.has(makeKey(x, y - 1, z))) {
        answer += 1;
      }
      if (!pointSet.has(makeKey(x, y, z + 1))) {
        answer += 1;
      }
      if (!pointSet.has(makeKey(x, y, z - 1))) {
        answer += 1;
      }
    } else if (part2 === true) {
      if (isOutside(pointSet, x + 1, y, z)) {
        answer += 1;
      }
      if (isOutside(pointSet, x - 1, y, z)) {
        answer += 1;
      }
      if (isOutside(pointSet, x, y + 1, z)) {
        answer += 1;
      }
      if (isOutside(pointSet, x, y - 1, z)) {
        answer += 1;
      }
      if (isOutside(pointSet, x, y, z + 1)) {
        answer += 1;
      }
      if (isOutside(pointSet, x, y, z - 1)) {
        answer += 1;
      }
    }
  });

  return answer;
};

module.exports = {
  part1,
};
