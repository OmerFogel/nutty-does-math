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
  // 12: Master — everything
  { ops: ['+', '-', '×'], minA: 1, maxA: 15, minB: 1, maxB: 10, maxSum: 20, masterMul: true },
];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function generateProblem(levelIdx) {
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
  if (level.multiplier !== undefined) {
    const b = rand(level.minB, level.maxB);
    const flip = Math.random() > 0.5;
    const [first, second] = flip ? [b, level.multiplier] : [level.multiplier, b];
    return { a: first, b: second, op, answer: first * second };
  }

  // Free multiplication (levels 11 & master)
  const mulMax = level.masterMul ? 10 : level.maxA;
  const a = rand(2, mulMax);
  const b = rand(2, level.maxB);
  return { a, b, op, answer: a * b };
}
