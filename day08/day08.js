const setupData = (input) => {
  const rows = input.map((r) => r.split(''));
  const cols = [];
  const visible = [];
  const scores = [];

  rows.forEach((r, i) => {
    r.forEach((c, j) => {
      if (!cols[j]) {
        cols[j] = [];
        visible[j] = [];
        scores[j] = [];
      }
      cols[j][i] = c;
      visible[j][i] = 0;
      scores[j][i] = 0;
    });
  });

  return {
    rows, cols, visible, scores,
  };
};

const parts = (i, values) => {
  const value = values[i];
  const left = values.slice(0, i);
  const right = values.slice(i + 1);

  return { value, left, right };
};

const isVisible = (i, values) => {
  if (i === 0 || i === (values.length - 1)) {
    return true;
  }

  const { value, left, right } = parts(i, values);
  if (Math.max(...left) < value) return true;
  if (Math.max(...right) < value) return true;

  return false;
};

const scenicScore = (i, values) => {
  const { value, left, right } = parts(i, values);

  return [left.reverse(), right].map((check) => {
    // console.log('Check', value,  check);
    let stop = false;
    const c2 = check.filter((v) => {
      if (stop) return false;
      if (v >= value) {
        stop = true;
      }
      return true;
    });
    return c2.length;
  }).reduce((a, c) => a * c, 1);
};

const day08 = (input) => {
  const {
    rows, cols, visible, scores,
  } = setupData(input);

  visible.forEach((row, r) => {
    row.forEach((x, c) => {
      if (isVisible(c, rows[r]) || isVisible(r, cols[c])) {
        visible[r][c] = 1;
      }
      const score = scenicScore(c, rows[r]) * scenicScore(r, cols[c]);
      scores[c][r] = score;
    });
  });

  const res = visible.flat().reduce((a, c) => a + c, 0);

  const maxScore = Math.max(...scores.flat());
  return { visible: res, score: maxScore };
};

module.exports = {
  day08,
  isVisible,
  scenicScore,
};
