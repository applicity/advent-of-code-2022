/* eslint-disable no-bitwise */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
const extractor = /^Valve (?<id>[A-Z]+) has flow rate=(?<rate>[0-9]+); tunnels? leads? to valves? (?<leadsTo>[A-Z, ]+)$/;

const setupData = (input) => {
  const data = input
    .map((l) => {
      // console.log(l);
      const { id, rate, leadsTo } = l.match(extractor).groups;

      return {
        id,
        rate: parseInt(rate, 10),
        leadsTo: leadsTo.split(', '),
      };
    });

  const valves = Object.fromEntries(data.map((v) => [v.id, v]));

  const nonEmpty = [];
  const distances = {};
  let visited = [];
  const queue = [];

  for (const key of Object.keys(valves)) {
    const valve = valves[key];

    if (valve.id !== 'AA' && !valves[valve.id].rate) {
      continue;
    }

    if (valve.id !== 'AA') {
      nonEmpty.push(valve.id);
    }

    distances[valve.id] = { AA: 0 };
    visited = [valve.id]; // .push(valve);

    queue.push([0, valve.id]);

    while (queue.length) {
      const [distance, v] = queue.shift();

      for (let y = 0; y < valves[v].leadsTo.length; y += 1) {
        const neighbour = valves[v].leadsTo[y];
        if (visited.includes(neighbour)) {
          continue;
        }
        visited.push(neighbour);
        if (valves[neighbour].rate > 0) {
          distances[valve.id][neighbour] = distance + 1;
        }
        queue.push([distance + 1, neighbour]);
      }
    }
    if (valve !== 'AA') {
      delete distances[valve.id].AA;
    }
    delete distances[valve.id][valve.id];
  }

  const indices = {};

  nonEmpty.forEach((v, i) => {
    indices[v] = i;
  });

  return {
    valves, distances, indices, nonEmpty,
  };
};

const makeCacheKey = (valve, time, openValves) => [valve, time, openValves].join(':');

const depthFirstSearch = (setup, time = 30, valve = 'AA', openValves = 0, cache = {}) => {
  const { distances, indices, valves } = setup;
  let maxVal = 0;

  const cKey = makeCacheKey(valve, time, openValves);
  if (cache[cKey]) return cache[cKey];

  // console.log('Valve', valve, distances[valve], Object.keys(distances[valve]));
  for (const neighbour of Object.keys(distances[valve])) {
    const openValve = 1 << indices[neighbour];
    if (openValves & openValve) {
      continue;
    }
    // Remaining time is time now - travel time - opening time.
    const remainingTime = time - distances[valve][neighbour] - 1;
    // Time ran out or would before we get there.
    if (remainingTime <= 0) {
      continue;
    }
    maxVal = Math.max(
      maxVal,
      depthFirstSearch(
        setup,
        remainingTime,
        neighbour,
        openValves | openValve,
        cache,
      ) + valves[neighbour].rate * remainingTime,
    );
  }

  // eslint-disable-next-line no-param-reassign
  cache[cKey] = maxVal;
  return maxVal;
};

const day16 = (input) => {
  const setup = setupData(input);
  return depthFirstSearch(setup, 30, 'AA', 0, {});
};

const day16p2 = (input) => {
  const setup = setupData(input);

  // The approach to part 2 is to brute force the us and the elephant by starting
  // with some valves closed.  We use the length of the valves that are worth visiting.
  // Though we can divide by two as it doesn't matter if it's
  // us or the elephant that opens th valve.
  let max = 0;

  const cache = {};

  const openValves = (1 << setup.nonEmpty.length) - 1;
  for (let i = 0; i < openValves / 2; i += 1) {
    max = Math.max(max, depthFirstSearch(setup, 26, 'AA', i, cache) + depthFirstSearch(setup, 26, 'AA', openValves ^ i));
    // console.log('i', i);
  }
  return max;
};

module.exports = {
  day16,
  day16p2,
};
