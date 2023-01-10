/* eslint-disable no-continue */

const extractor = /^(?<monkey>[a-z]+): ((?<number>[0-9]+)|((?<lh>[a-z]+) (?<op>[+*/-]) (?<rh>[a-z]+)))/;

const setupData = (input) => {
  const monkeys = {};

  const rules = input.map((l) => {
    const matches = l.match(extractor);
    // return matches.groups;

    const values = matches.groups;
    let monkey = {};

    if (values.number === undefined) {
      const { lh, op, rh } = values;
      monkey = {
        type: 'calc',
        lh,
        rh,
        op,
      };
    } else {
      monkey = {
        type: 'result',
        value: parseInt(values.number, 10),
      };
    }

    monkeys[values.monkey] = monkey;
    return monkey;
  });
  return { rules, monkeys };
};

// Recursive function to calculate monkey value
const monkeyValue = (monkeys, id) => {
  const monkey = monkeys[id];

  if (monkey.type === 'result') {
    return monkey.value;
  }

  // It's an operation so get the values.
  const lhMonkey = monkeyValue(monkeys, monkey.lh);
  const rhMonkey = monkeyValue(monkeys, monkey.rh);

  if (monkey.op === '+') return lhMonkey + rhMonkey;
  if (monkey.op === '-') return lhMonkey - rhMonkey;
  if (monkey.op === '*') return lhMonkey * rhMonkey;
  if (monkey.op === '/') return lhMonkey / rhMonkey;
  return 0;
};

const usesHuman = (monkeys, id) => {
  const monkey = monkeys[id];
  if (monkey.type === 'result') return false;
  if (monkey.lh === 'humn' || monkey.rh === 'humn') return true;
  return usesHuman(monkeys, monkey.lh) || usesHuman(monkeys, monkey.rh);
};

const setHuman = (monkeys, value) => {
  // eslint-disable-next-line no-param-reassign
  monkeys.humn = {
    type: 'result',
    value,
  };
};

const process = (input, part2 = false) => {
  const { monkeys } = setupData(input);
  // console.log(rules, monkeys);

  if (!part2) {
    const res = monkeyValue(monkeys, 'root');
    // console.log(rules, monkeys, res);
    return res;
  }

  // Part 2.

  const rootMonkey = monkeys.root;
  let human;
  let target;

  // Work out which of the monkeys depends on the human
  if (usesHuman(monkeys, rootMonkey.lh)) {
    human = rootMonkey.lh;
    target = monkeyValue(monkeys, rootMonkey.rh);
  }

  if (usesHuman(monkeys, rootMonkey.rh)) {
    human = rootMonkey.rh;
    target = monkeyValue(monkeys, rootMonkey.lh);
  }

  // work out the direction of search
  setHuman(monkeys, 1);
  const mOne = monkeyValue(monkeys, human);

  setHuman(monkeys, 0);
  let check = monkeyValue(monkeys, human);

  const direction = check < mOne ? 1 : -1;
  let increment = 1e12;
  let current = 0;
  let isUnder = true;

  // While we haven't found a match look above and below (or vice versa).
  // Then reduce the increment by 1 sig figure to step towards the right
  // answer.  Could optimise further by using half way to wall.
  while (check !== target) {
    if (check > target) {
      if (isUnder) {
        increment /= 10;
      }
      isUnder = false;
      current -= increment * direction;
    }
    if (check < target) {
      if (isUnder) {
        increment /= 10;
      }
      isUnder = true;
      current += increment * direction;
    }
    setHuman(monkeys, current);
    check = monkeyValue(monkeys, human);
  }

  return monkeys.humn.value;
};

module.exports = {
  process,
};
