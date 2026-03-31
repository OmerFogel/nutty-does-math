import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '../public/all-positions.png');
const OUT = path.join(__dirname, '../public');

// 3 columns × 4 rows
const COLS = 3;
const ROWS = 4;
const W = Math.floor(1696 / COLS); // 565
const H = Math.floor(2502 / ROWS); // 625

// Frame name mapping: [row][col]
const FRAMES = [
  ['idle-0',      'idle-1',      'walk-0'     ],
  ['walk-1',      'walk-2',      'celebrate-0'],
  ['happy-0',     'wrong-0',     'wrong-1'    ],
  ['celebrate-1', 'happy-1',     'celebrate-2'],
];

for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const name = FRAMES[row][col];
    const left = col * W;
    const top  = row * H;
    const outFile = path.join(OUT, `nutty-${name}.png`);
    await sharp(SRC)
      .extract({ left, top, width: W, height: H })
      .toFile(outFile);
    console.log(`✓ ${name}  (${left},${top}) ${W}×${H}  → nutty-${name}.png`);
  }
}
console.log('Done!');
