/* eslint-disable no-continue */

const setupData = (input, decryptionKey) => {
  const numbers = input.map((l, i) => ({ num: parseInt(l, 10) * decryptionKey, index: i }));
  return { numbers };
};

const process = (input, decryptionKey = 1, runs = 1) => {
  const { numbers } = setupData(input, decryptionKey);

  const forMove = [...numbers];

  const len = numbers.length;

  // console.log('Numbers', numbers);
  for (let loop = 0; loop < runs; loop += 1) {
    numbers.forEach((number) => {
      const { num, index } = number;

      if (num !== 0) {
        const pos = forMove.indexOf(forMove.find((item) => item.index === index));
        let newPos = (pos + num) % (len - 1);
        if (newPos <= 0) {
          newPos = len + newPos - 1;
        }

        forMove.splice(pos, 1);
        forMove.splice(newPos, 0, { num, index });
      }
      // console.log(num, pos, newPos, forMove);
    });
    // console.log(loop + 1, JSON.stringify(forMove.map((m) => m.num)));
  }

  const posZero = forMove.indexOf(forMove.find((item) => item.num === 0));

  const res = [1000, 2000, 3000]
    .map((v) => forMove[((v + posZero) % forMove.length)])
    .reduce((a, c) => a + c.num, 0);
  return res;
};

module.exports = {
  process,
};
