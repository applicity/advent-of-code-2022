const setupData = (input) => {
  const start = {};
  const end = {};
  const map = input
    .map((line) => [...line])
    .map((line, y) => line.map((col, x) => {
      if (col === 'S') {
        start.x = x;
        start.y = y;
        return 0;
      }
      if (col === 'E') {
        end.x = x;
        end.y = y;
        return 25;
      }

      return col.charCodeAt(0) - 'a'.charCodeAt(0);
    }));

  return { start, end, map };
};

const pointToIndex = (x, y) => [x, y].join(':');
const indexToPoint = (index) => index.split(':').map((v) => parseInt(v, 10));

const upwardOptions = (x, y, map) => {
  const res = [];

  if (y + 1 < map.length && map[y + 1][x] <= map[y][x] + 1) {
    res.push(pointToIndex(x, y + 1));
  }
  if (y - 1 >= 0 && map[y - 1][x] <= map[y][x] + 1) {
    res.push(pointToIndex(x, y - 1));
  }
  if (x + 1 < map[y].length && map[y][x + 1] <= map[y][x] + 1) {
    res.push(pointToIndex(x + 1, y));
  }
  if (x - 1 >= 0 && map[y][x - 1] <= map[y][x] + 1) {
    res.push(pointToIndex(x - 1, y));
  }
  return res;
};

const downwardOptions = (x, y, map) => {
  const res = [];

  if (y + 1 < map.length && map[y + 1][x] >= map[y][x] - 1) {
    res.push(pointToIndex(x, y + 1));
  }
  if (y - 1 >= 0 && map[y - 1][x] >= map[y][x] - 1) {
    res.push(pointToIndex(x, y - 1));
  }
  if (x + 1 < map[y].length && map[y][x + 1] >= map[y][x] - 1) {
    res.push(pointToIndex(x + 1, y));
  }
  if (x - 1 >= 0 && map[y][x - 1] >= map[y][x] - 1) {
    res.push(pointToIndex(x - 1, y));
  }
  return res;
};

// Dijkstra Algorithm from here - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
const dijkstra = (map, start, end, part2) => {
  const distance = {};
  const previous = {};
  let queue = [];

  const getOptions = part2 ? downwardOptions : upwardOptions;

  // Itterate over the rows
  for (let y = 0; y < map.length; y += 1) {
    // Iterate over the columns
    for (let x = 0; x < map[y].length; x += 1) {
      const id = pointToIndex(x, y);
      distance[id] = Infinity;
      queue.push(id);
    }
  }
  distance[pointToIndex(start.x, start.y)] = 0;

  while (queue.length) {
    let u = null;
    queue.forEach((index) => {
      if (u === null || distance[index] < distance[u]) {
        u = index;
      }
    });

    const point = indexToPoint(u);
    if (part2 && map[point[1]][point[0]] === 0) {
      return {
        distance,
        start: u,
      };
    }

    if (!part2 && u === pointToIndex(end.x, end.y)) {
      break;
    }
    queue = queue.filter((x) => x !== u);

    const neighbors = getOptions(point[0], point[1], map);
    for (let i = 0; i < neighbors.length; i += 1) {
      const v = neighbors[i];
      if (queue.includes(v)) {
        const alt = distance[u] + 1;
        if (alt < distance[v]) {
          distance[v] = alt;
          previous[v] = u;
        }
      }
    }
  }
  return {
    distance,
    previous,
  };
};

const day12 = (input, part2) => {
  const { start, end, map } = setupData(input);

  const data = dijkstra(map, part2 ? end : start, end, part2);

  if (part2) {
    return data.distance[data.start];
  }

  const { distance } = data;

  const res = distance[pointToIndex(end.x, end.y)];

  return res;
};

module.exports = {
  day12,
};
