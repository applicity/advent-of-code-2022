const scores = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
};

const wins = {
  'A:C': 1, // "Rock:Scissors": 1,
  'C:B': 1, // "Scissors:Paper": 1,
  'B:A': 1, //  "Paper:Rock": 1,
};

const toWin = {
  A: 'B',
  B: 'C',
  C: 'A',
};

const toLoose = {
  A: 'C',
  B: 'A',
  C: 'B',
};

const normaliseChoice = (a) => {
  const map = {
    X: 'A',
    Y: 'B',
    Z: 'C',
  };

  return map[a];
};

const isWin = (a, b) => {
  const result = [a, b].join(':');
  if (wins[result]) return true;
  return false;
};

const outcomeScore = (a, b) => {
  let score = 0;

  // Draw
  if (a === b) {
    score += 3;
  } else if (isWin(b, a)) {
    score += 6;
  }

  score += scores[b];

  return score;
};

const scoreChoices = (choices) => outcomeScore(choices[0], choices[1]);

const fixChoices = (a) => [a[0], normaliseChoice(a[1])];

// X - Loose
// Y - Draw
// Z - Win
const chooseResult = (a) => {
  if (a[1] === 'Y') {
    return [a[0], a[0]];
  }

  if (a[1] === 'X') {
    return [a[0], toLoose[a[0]]];
  }

  if (a[1] === 'Z') {
    return [a[0], toWin[a[0]]];
  }

  return false;
};

const engine = (input, p2) => {
  const res = input
    .map((v) => v.split(' '))
    .map(p2 ? chooseResult : fixChoices)
    .map(scoreChoices)
    .reduce((a, c) => a + c, 0);
  return res;
};

module.exports = { engine, chooseResult };
