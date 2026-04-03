export const WALNUTS_PER_LEVEL = 10;

export const LEVELS = [
  // 1: Easy addition (sums 1–5)
  { ops: ['+'], minA: 1, maxA: 4, minB: 1, maxB: 4, maxSum: 5 },
  // 2: Addition to 10
  { ops: ['+'], minA: 1, maxA: 9, minB: 1, maxB: 9, maxSum: 10 },
  // 3: Addition to 20
  { ops: ['+'], minA: 2, maxA: 15, minB: 2, maxB: 15, maxSum: 20 },
  // 4: Easy subtraction
  { ops: ['-'], minA: 2, maxA: 6 },
  // 5: Subtraction to 10
  { ops: ['-'], minA: 3, maxA: 10 },
  // 6: Subtraction to 20
  { ops: ['-'], minA: 5, maxA: 20 },
  // 7: Mixed add/subtract to 20
  { ops: ['+', '-'], minA: 1, maxA: 18, minB: 1, maxB: 18, maxSum: 20 },
  // 8: Times 2
  { ops: ['×'], multiplier: 2, minB: 1, maxB: 10 },
  // 9: Times 5
  { ops: ['×'], multiplier: 5, minB: 1, maxB: 10 },
  // 10: Times 10
  { ops: ['×'], multiplier: 10, minB: 1, maxB: 10 },
  // 11: Mixed multiplication 2–10
  { ops: ['×'], minA: 2, maxA: 10, minB: 2, maxB: 10 },
  // 12: Master — everything so far
  { ops: ['+', '-', '×'], minA: 1, maxA: 15, minB: 1, maxB: 10, maxSum: 20, masterMul: true },
  // 13: Divide by 2
  { ops: ['÷'], divisor: 2, minQ: 1, maxQ: 10 },
  // 14: Divide by 5
  { ops: ['÷'], divisor: 5, minQ: 1, maxQ: 10 },
  // 15: Divide by 10
  { ops: ['÷'], divisor: 10, minQ: 1, maxQ: 10 },
  // 16: Mixed division (÷2–÷10)
  { ops: ['÷'], minDivisor: 2, maxDivisor: 10, minQ: 1, maxQ: 10 },
  // 17: Mixed multiplication & division
  { ops: ['×', '÷'], minA: 2, maxA: 10, minB: 2, maxB: 10, minQ: 1, maxQ: 10 },
  // 18: Grand Master — all four operations
  { ops: ['+', '-', '×', '÷'], minA: 1, maxA: 15, minB: 1, maxB: 10, maxSum: 20, masterMul: true, minQ: 1, maxQ: 10 },
];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function problemKey(p) {
  return `${p.a}${p.op}${p.b}`;
}

function makeProblem(levelIdx) {
  const level = LEVELS[levelIdx];
  const op = level.ops[Math.floor(Math.random() * level.ops.length)];

  if (op === '+') {
    const a = rand(level.minA, level.maxA);
    const bMax = level.maxSum
      ? Math.min(level.maxB, level.maxSum - a)
      : level.maxB;
    const b = rand(level.minB, Math.max(level.minB, bMax));
    return { a, b, op, answer: a + b };
  }

  if (op === '-') {
    const a = rand(level.minA, level.maxA);
    const b = rand(1, a);
    return { a, b, op, answer: a - b };
  }

  // ×
  if (op === '×') {
    if (level.multiplier !== undefined) {
      const b = rand(level.minB, level.maxB);
      const flip = Math.random() > 0.5;
      const [first, second] = flip ? [b, level.multiplier] : [level.multiplier, b];
      return { a: first, b: second, op, answer: first * second };
    }
    // Free multiplication (levels 11, 17 & master)
    const mulMax = level.masterMul ? 10 : level.maxA;
    const a = rand(2, mulMax);
    const b = rand(2, level.maxB);
    return { a, b, op, answer: a * b };
  }

  // ÷
  if (op === '÷') {
    if (level.divisor !== undefined) {
      const q = rand(level.minQ, level.maxQ);
      return { a: level.divisor * q, b: level.divisor, op, answer: q };
    }
    // Free division (levels 16, 17 & master)
    const b = rand(level.minDivisor ?? 2, level.maxDivisor ?? 10);
    const q = rand(level.minQ ?? 1, level.maxQ ?? 10);
    return { a: b * q, b, op, answer: q };
  }
}

// Keep the last N problems to avoid immediate repetition
const HISTORY_SIZE = 5;
const recentKeys = [];

export function generateProblem(levelIdx) {
  let problem;
  let attempts = 0;
  do {
    problem = makeProblem(levelIdx);
    attempts++;
    // Give up avoiding repeats after 20 tries (small levels may have few unique combos)
  } while (recentKeys.includes(problemKey(problem)) && attempts < 20);

  recentKeys.push(problemKey(problem));
  if (recentKeys.length > HISTORY_SIZE) recentKeys.shift();

  return problem;
}

export function resetHistory() {
  recentKeys.length = 0;
}
