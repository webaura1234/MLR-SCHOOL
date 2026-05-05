import sharp from 'sharp';
import { resolve } from 'path';
import { existsSync } from 'fs';

const images = [
  'summer-camp-adventure.png',
  'dance.png',
  'hero-aspirational.png',
];

for (const img of images) {
  const input = resolve('public', img);
  const output = resolve('public', img.replace('.png', '.webp'));

  if (!existsSync(input)) {
    console.log(`Skip (missing): ${img}`);
    continue;
  }

  await sharp(input).webp({ quality: 80 }).toFile(output);

  console.log(`Compressed: ${img} → ${img.replace('.png', '.webp')}`);
}

