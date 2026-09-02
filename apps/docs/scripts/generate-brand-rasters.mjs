#!/usr/bin/env node
/**
 * Génère les déclinaisons raster de la marque TDGS à partir des sources SVG.
 * Source unique : public/brand/*.svg et public/favicon.svg — ne pas retoucher
 * les PNG à la main, relancer `pnpm --filter tds-docs gen:brand`.
 *
 * Les icônes (favicon, apple-touch, PWA) sont rendues depuis la marque seule
 * (aucun texte) : le rendu est donc identique quel que soit l'environnement.
 * L'image Open Graph contient du texte ; en l'absence des polices de marque sur
 * la machine de build, une police sans-serif de repli est utilisée — l'aperçu
 * réseau reste lisible et le fichier est régénérable.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(here, '..', 'public');
const BRAND = join(PUBLIC, 'brand');

/** @type {{ src: string, out: string, size: number | [number, number], bg?: string, pad?: number }[]} */
const targets = [
  { src: join(PUBLIC, 'favicon.svg'), out: join(PUBLIC, 'favicon-32.png'), size: 32 },
  { src: join(PUBLIC, 'favicon.svg'), out: join(PUBLIC, 'favicon.png'), size: 48 },
  {
    src: join(BRAND, 'tdgs-mark.svg'),
    out: join(PUBLIC, 'apple-touch-icon.png'),
    size: 180,
    bg: '#FFFFFF',
    pad: 26,
  },
  {
    src: join(BRAND, 'tdgs-mark.svg'),
    out: join(PUBLIC, 'icon-192.png'),
    size: 192,
    bg: '#FFFFFF',
    pad: 24,
  },
  {
    src: join(BRAND, 'tdgs-mark.svg'),
    out: join(PUBLIC, 'icon-512.png'),
    size: 512,
    bg: '#FFFFFF',
    pad: 64,
  },
  // Maskable : la marque tient dans la « zone de sécurité » de 80 % (marge 20 %).
  {
    src: join(BRAND, 'tdgs-mark.svg'),
    out: join(PUBLIC, 'icon-maskable-512.png'),
    size: 512,
    bg: '#FFFFFF',
    pad: 108,
  },
  { src: join(BRAND, 'og-image.svg'), out: join(BRAND, 'og-image.png'), size: [1200, 630] },
];

async function render({ src, out, size, bg, pad = 0 }) {
  const svg = readFileSync(src);
  const [w, h] = Array.isArray(size) ? size : [size, size];

  if (pad > 0 || bg) {
    const inner = await sharp(svg, { density: 384 })
      .resize(w - pad * 2, h - pad * 2, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    await sharp({
      create: {
        width: w,
        height: h,
        channels: 4,
        background: bg ?? { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: inner, gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(out);
  } else {
    await sharp(svg, { density: 384 })
      .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out);
  }
  process.stdout.write(`[brand] ${out.replace(PUBLIC, 'public')} (${w}x${h})\n`);
}

for (const t of targets) {
  await render(t);
}
process.stdout.write('[brand] terminé.\n');
