const isDivisibleBy = (v, d) => !(v % d);

const makeOpFunction = (op) => {
  const selection = op.replace('  Operation: new = ', '');
  if (selection === 'old * old') return (v) => v * v;

  const parts = selection.split(' ');
  const operation = parts[1];
  const value = parseInt(parts[2], 10);

  if (operation === '+') return (v) => v + value;
  if (operation === '*') return (v) => v * value;

  return (v) => v;
};

const setupData = (input) => {
  const monkeys = input.split('\n\n').map(((c) => {
    const parts = c.split('\n');
    return {
      items: parts[1].replace('  Starting items: ', '').split(',').map((i) => parseInt(i, 10)),
      inspected: 0,
      op: makeOpFunction(parts[2]),
      t: parseInt(parts[3].replace('  Test: divisible by', ''), 10),
      tr: [
        parseInt(parts[4].replace('    If true: throw to monkey ', ''), 10),
        parseInt(parts[5].replace('    If false: throw to monkey ', ''), 10),
      ],
    };
  }));

  return { monkeys };
};

const processRound = (mks, limit, part2) => {
  mks.forEach((m, i) => {
    const items = [...m.items];
    let item = items.shift();
    // eslint-disable-next-line no-param-reassign
    mks[i].items = [];
    while (item) {
      // eslint-disable-next-line no-param-reassign
      mks[i].inspected += 1;
      const newLevel = m.op(item);
      const worryLevel = part2 ? newLevel % limit : Math.floor(newLevel / 3);

      if (isDivisibleBy(worryLevel, m.t)) {
        mks[m.tr[0]].items.push(worryLevel);
      } else {
        mks[m.tr[1]].items.push(worryLevel);
      }

      item = items.shift();
    }
  });
};

const day11 = (input, rounds = 10000, part2 = false) => {
  const { monkeys } = setupData(input);

  const limit = monkeys.map((m) => m.t).reduce((a, c) => a * c, 1);

  for (let i = 0; i < rounds; i += 1) {
    processRound(monkeys, limit, part2);
  }

  const monkeyBusiness = monkeys
    .map((m) => m.inspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, c) => a * c, 1);
  return { monkeyBusiness };
};

module.exports = {
  day11,
};
