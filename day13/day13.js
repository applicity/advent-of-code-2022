const setupData = (input) => {
  const pairs = input.map((p) => p.split('\n'));
  // console.log('Pairs', pairs);

  const p2 = pairs.map((p) => [JSON.parse(p[0]), JSON.parse(p[1])]);

  // console.log(JSON.stringify(p2));
  return { pairs: p2 };
};

const dividers = '[[2]]\n[[6]]';

const correct = (la, ra) => {
  const length = Math.max(...[la.length, ra.length]);

  // console.log('Length', length);
  for (let i = 0; i < length; i += 1) {
    if (Array.isArray(la[i]) || Array.isArray(ra[i])) {
      if (typeof ra[i] === 'undefined') {
        return false;
      }

      const sub = correct(
        Array.isArray(la[i]) ? la[i] : [la[i]],
        Array.isArray(ra[i]) ? ra[i] : [ra[i]],
      );
      if (sub != null) {
        return sub;
      }

      if (correct(Array.isArray(la[i]) ? la[i] : [la[i]], Array.isArray(ra[i]) ? ra[i] : [ra[i]])) {
        return true;
      }
    }
    if (la[i] < ra[i]) return true;
    if (ra[i] < la[i]) return false;
    if (typeof la[i] === 'undefined') return true;
    if (typeof ra[i] === 'undefined') return false;
  }
  return null;
};

const day13 = (input) => {
  const { pairs } = setupData(input);

  const res = pairs
    .map((v) => correct(v[0], v[1]))
    .map((v, i) => (v ? i + 1 : 0))
    .reduce((a, c) => a + c, 0);
  return res;
};

const day13p2 = (input) => {
  const packets = [input, dividers]
    .join('\n')
    .split('\n')
    .filter(Boolean)
    .map(JSON.parse)
    .sort((a, b) => {
      if (correct(b, a)) return 1;
      return -1;
    })
    .map(JSON.stringify);

  const res = dividers
    .split('\n')
    .map((d) => packets.indexOf(d) + 1)
    .reduce((a, c) => a * c, 1);

  return res;
};

module.exports = {
  day13,
  correct,
  day13p2,
};
