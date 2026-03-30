/**
 * Removes the dark blue background from nutty.png.
 * The squirrel is orange/brown (red-dominant) — the background is blue-dominant.
 * Strategy: if blue channel significantly exceeds red channel → background pixel → make transparent.
 */
import sharp from 'sharp';

const INPUT  = 'public/nutty.png';
const OUTPUT = 'public/nutty.png';

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const buf = Buffer.from(data);

for (let i = 0; i < buf.length; i += channels) {
  const r = buf[i];
  const g = buf[i + 1];
  const b = buf[i + 2];
  const brightness = r + g + b;

  // Blue-dominant AND dark → background or number overlay
  const blueDominant = b > r + 18 && b > g + 6;
  const dark = brightness < 360;

  if (blueDominant && dark) {
    // Full transparency for clear background pixels
    buf[i + 3] = 0;
  } else if (blueDominant && brightness < 480) {
    // Soft edge: partial transparency for transitional pixels
    const factor = (480 - brightness) / 120;
    buf[i + 3] = Math.round(buf[i + 3] * (1 - factor * 0.8));
  }
}

await sharp(buf, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT);

console.log(`Done — processed ${width}×${height} px → ${OUTPUT}`);
