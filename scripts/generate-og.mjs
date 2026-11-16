/**
 * Renders the single social card used as og:image and twitter:image.
 * Run with `npm run og` after changing the palette or the copy.
 *
 * The site loads Geist and Instrument Serif from Google Fonts; they are not installed
 * locally, so the card falls back to the closest system faces available to the renderer.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'public/og.png');

const bg = '#f4f3ef';
const ink = '#111113';
const muted = '#6b6a66';
const accent = '#3346ff';
const line = '#dcdad3';

const sans = "'Geist', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const serif = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const mono = "'Geist Mono', Consolas, 'Courier New', monospace";

const dots = Array.from({ length: 14 }, (_, row) =>
  Array.from({ length: 16 }, (_, col) => `<circle cx="${700 + col * 30}" cy="${40 + row * 30}" r="1.6" fill="${line}"/>`).join(''),
).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  ${dots}
  <rect x="72" y="64" width="44" height="44" rx="12" fill="${ink}"/>
  <text x="94" y="92" font-family="${mono}" font-size="16" fill="${bg}" text-anchor="middle">MP</text>
  <text x="132" y="93" font-family="${sans}" font-size="24" font-weight="600" fill="${ink}">Mattia Patruno</text>
  <text x="72" y="268" font-family="${sans}" font-size="96" font-weight="600" letter-spacing="-4" fill="${ink}">Interfacce</text>
  <text x="72" y="370"><tspan font-family="${serif}" font-size="108" font-style="italic" fill="${accent}">chiare</tspan><tspan dx="28" font-family="${sans}" font-size="96" font-weight="600" letter-spacing="-4" fill="${ink}">per web app.</tspan></text>
  <rect x="72" y="468" width="1056" height="1" fill="${line}"/>
  <text x="72" y="522" font-family="${mono}" font-size="22" letter-spacing="2" fill="${ink}">UI/UX DESIGN · FRONT-END · AI &amp; AUTOMAZIONE</text>
  <text x="72" y="562" font-family="${mono}" font-size="19" letter-spacing="2" fill="${muted}">M3TTIW.GITHUB.IO/CV</text>
  <circle cx="1108" cy="540" r="20" fill="${accent}"/>
</svg>`;

await mkdir(dirname(output), { recursive: true });
await writeFile(output, await sharp(Buffer.from(svg)).png().toBuffer());
console.log(`Wrote ${output}`);
