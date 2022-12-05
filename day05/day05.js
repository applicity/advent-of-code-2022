const { clone } = require('../utils');

const extractMove = (move) => {
  const matches = move.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
  return [1, 2, 3].map((c) => matches[c]).map((v) => parseInt(v, 10)).map((v) => v - 1);
};

// A helper to build a set of arrays from the input
// Takes an array of lines.
// Filters the lines to those that contain [
// Then converts columns to arrays
const buildStack = (input) => {
  const stack = [];

  input.filter((l) => l.match(/\[/))
    .forEach((l) => {
      let pos = 1;
      const len = l.length;

      let count = 0;
      while (pos <= len) {
        if (!stack[count]) {
          stack[count] = [];
        }

        if (l[pos] !== ' ') {
          stack[count].push(l[pos]);
        }

        pos += 4;
        count += 1;
      }
    });

  return stack;
};

const day05 = (input, inStack, p2) => {
  // Clone the input as we are going to mutate it.
  const stack = clone(inStack);

  // Get the move lines from the input
  const moves = input.filter((v) => v.match(/^move/));

  // Process the moves
  moves.forEach((m) => {
    const [count, from, to] = extractMove(m);
    const move = p2 ? stack[from].slice(0, count + 1) : stack[from].slice(0, count + 1).reverse();
    stack[from].splice(0, count + 1);
    stack[to] = move.concat(stack[to]);
  });

  // Return the top element of each stack and join together as a string
  return stack.map((v) => v[0]).join('');
};

module.exports = {
  day05,
  buildStack,
};
