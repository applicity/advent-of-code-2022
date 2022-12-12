// A definition of how to move the tail based on the difference
const moveTail = {
  // head is 2 up 1 right from tail, then tail follows up and right once
  '2, 1': [1, 1],
  // 1 up, 2 right
  '1, 2': [1, 1],
  // 2 up
  '2, 0': [1, 0],
  // 2 up 1left
  '2, -1': [1, -1],
  // 1 up, 2 left
  '1, -2': [1, -1],
  // 2 left
  '0, -2': [0, -1],
  '-1, -2': [-1, -1],
  '-2, -1': [-1, -1],
  '-2, 0': [-1, 0],
  '-2, 1': [-1, 1],
  '-1, 2': [-1, 1],
  '0, 2': [0, 1],
  // # additional cases for part 2
  '2, 2': [1, 1],
  '-2, -2': [-1, -1],
  '-2, 2': [-1, 1],
  '2, -2': [1, -1],
};

const updateHead = (h, direction) => {
  const res = h.map((m) => m);
  switch (direction) {
    case 'U':
      res[0] = h[0] + 1;
      break;
    case 'D':
      res[0] = h[0] - 1;
      break;
    case 'L':
      res[1] = h[1] - 1;
      break;
    case 'R':
      res[1] = h[1] + 1;
      break;
    default:
  }

  return res;
};

const updateTail = (head, tail) => {
  const difference = head.map((h, i) => h - tail[i]).join(', ');

  const move = moveTail[difference] ? moveTail[difference] : [0, 0];
  return tail.map((t, i) => t + move[i]);
};

const setupData = (input) => {
  const moves = input.map((r) => r.split(' '));

  return {
    moves,
  };
};

const day09 = (input, ropeLength = 2) => {
  const { moves } = setupData(input);
  const positions = { '0, 0': 1 };

  const rope = [...Array(ropeLength).keys()].map(() => [0, 0]);

  moves.forEach((m) => {
    const direction = m[0];
    let distance = m[1];
    // let [direction, distance] = m;
    distance = parseInt(distance, 10);
    while (distance > 0) {
      rope[0] = updateHead(rope[0], direction);
      for (let i = 1; i < rope.length; i += 1) {
        rope[i] = updateTail(rope[i - 1], rope[i]);
      }
      positions[rope[ropeLength - 1].join(', ')] = 1;
      distance -= 1;
    }
  });

  return Object.keys(positions).length;
};

module.exports = {
  day09,
  updateHead,
};
