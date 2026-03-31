/**
 * Saturation-based flood-fill background removal for sprite frames.
 *
 * The sprite sheet has a checkerboard background (two neutral grays ~148 and ~218)
 * that was not saved as real transparency. Since both grays are nearly achromatic
 * (saturation < 8), we flood-fill from every border pixel that has low saturation
 * and set those pixels to transparent.
 *
 * Squirrel pixels are orange/brown/black and have much higher saturation, so
 * they are safe even when adjacent to the flood-fill boundary.
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '../public');

const FILL_SAT  = 22;   // pixels with saturation below this → background (flood)
const EDGE_SAT  = 45;   // pixels with saturation below this AND next to bg → soften

function saturation(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

async function removeBg(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const px = new Uint8Array(data);

  const pxIdx = (x, y) => (y * width + x) * 4;

  // ── BFS flood fill from all border pixels with low saturation ─────────────
  const visited = new Uint8Array(width * height); // 0 = unvisited, 1 = queued/done
  const queue   = new Int32Array(width * height * 2); // flat [x, y, x, y, …]
  let qHead = 0, qTail = 0;

  const tryEnqueue = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const vi = y * width + x;
    if (visited[vi]) return;
    const i = pxIdx(x, y);
    if (saturation(px[i], px[i+1], px[i+2]) < FILL_SAT) {
      visited[vi] = 1;
      queue[qTail++] = x;
      queue[qTail++] = y;
    }
  };

  // Seed from all four edges
  for (let x = 0; x < width;    x++) { tryEnqueue(x, 0); tryEnqueue(x, height-1); }
  for (let y = 1; y < height-1; y++) { tryEnqueue(0, y); tryEnqueue(width-1, y); }

  const DX = [-1, 1,  0, 0];
  const DY = [ 0, 0, -1, 1];

  while (qHead < qTail) {
    const x = queue[qHead++];
    const y = queue[qHead++];
    px[pxIdx(x, y) + 3] = 0;            // fully transparent
    for (let d = 0; d < 4; d++) tryEnqueue(x + DX[d], y + DY[d]);
  }

  // ── Soften edges: partial alpha for near-background pixels next to fill ───
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = pxIdx(x, y);
      if (px[i + 3] === 0) continue;    // already transparent

      const sat = saturation(px[i], px[i+1], px[i+2]);
      if (sat >= EDGE_SAT) continue;    // fully opaque, not near bg

      // Only soften if directly adjacent to a transparent pixel
      let nearBg = false;
      for (let d = 0; d < 4; d++) {
        const nx = x + DX[d], ny = y + DY[d];
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          if (px[pxIdx(nx, ny) + 3] === 0) { nearBg = true; break; }
        }
      }
      if (!nearBg) continue;

      // Ramp from 0→255 as saturation goes from FILL_SAT→EDGE_SAT
      const alpha = Math.round(((sat - FILL_SAT) / (EDGE_SAT - FILL_SAT)) * 255);
      px[i + 3] = Math.max(0, Math.min(255, alpha));
    }
  }

  // ── Write back ────────────────────────────────────────────────────────────
  await sharp(Buffer.from(px.buffer), { raw: { width, height, channels: 4 } })
    .png()
    .toFile(filePath);
}

// Process all nutty-*.png sprite frames
const files = readdirSync(PUBLIC)
  .filter(f => f.startsWith('nutty-') && f.endsWith('.png'))
  .map(f => path.join(PUBLIC, f));

console.log(`Processing ${files.length} sprites…`);
for (const f of files) {
  process.stdout.write(`  ${path.basename(f)}… `);
  await removeBg(f);
  console.log('done');
}
console.log('All done!');
