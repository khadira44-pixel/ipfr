/**
 * One-off asset pipeline.
 *
 * Source images live in /original-assets (not served publicly) and are
 * converted into right-sized WebP/JPEG derivatives in /public/images.
 * Run with: npm run assets:optimize
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "original-assets");
const outputDir = path.join(root, "public", "images");

const jobs = [
  {
    input: "hero-source.jpg",
    output: "hero-broadcast.webp",
    width: 1920,
    height: 1080,
    fit: "cover",
    quality: 80,
  },
  {
    input: "showcase-boxing.jpg",
    output: "showcase-boxing.webp",
    width: 1200,
    height: 750,
    fit: "cover",
    quality: 76,
  },
  {
    input: "showcase-basketball.jpg",
    output: "showcase-basketball.webp",
    width: 1200,
    height: 750,
    fit: "cover",
    quality: 76,
  },
  {
    input: "showcase-derby.jpg",
    output: "ambient-night.webp",
    width: 1200,
    height: 750,
    fit: "cover",
    quality: 76,
  },
];

async function buildOgImage() {
  const width = 1200;
  const height = 630;
  const background = await sharp(path.join(sourceDir, "hero-source.jpg"))
    .resize(width, height, { fit: "cover", position: "attention" })
    .modulate({ brightness: 0.55 })
    .toBuffer();

  const overlay = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#050608" stop-opacity="0.98"/>
          <stop offset="58%" stop-color="#050608" stop-opacity="0.82"/>
          <stop offset="100%" stop-color="#050608" stop-opacity="0.28"/>
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#F0DDC1"/>
          <stop offset="55%" stop-color="#D9B98C"/>
          <stop offset="100%" stop-color="#B08A56"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#fade)"/>
      <circle cx="100" cy="104" r="28" fill="none" stroke="url(#gold)" stroke-width="1.5"/>
      <path d="M94 92 112 104 94 116Z" fill="url(#gold)"/>
      <text x="148" y="99" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#F4F0E6">StreamVault</text>
      <text x="148" y="122" font-family="Consolas, monospace" font-size="11" letter-spacing="5" fill="#D9B98C">PRIVATE CINEMA</text>
      <text x="72" y="280" font-family="Georgia, 'Times New Roman', serif" font-size="78" fill="#F4F0E6">Television,</text>
      <text x="72" y="366" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-style="italic" fill="url(#gold)">beautifully delivered.</text>
      <text x="72" y="432" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#969DAA">20,000+ channels · 4K &amp; 8K · Dolby Atmos · 99.9% uptime</text>
      <rect x="72" y="486" width="246" height="54" rx="27" fill="url(#gold)"/>
      <text x="104" y="521" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="2" fill="#07080A">BEGIN YOUR TRIAL</text>
      <rect x="72" y="580" width="1056" height="1" fill="#F4F0E6" opacity="0.12"/>
    </svg>
  `);

  await sharp(background)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(root, "public", "og.jpg"));
}

await mkdir(outputDir, { recursive: true });

for (const job of jobs) {
  const pipeline = sharp(path.join(sourceDir, job.input)).resize(job.width, job.height, {
    fit: job.fit,
    position: "attention",
  });

  await pipeline
    .webp({ quality: job.quality, effort: 6 })
    .toFile(path.join(outputDir, job.output));
}

async function buildIcons() {
  const iconSource = path.join(root, "src", "app", "icon.svg");

  await sharp(iconSource).resize(180, 180).png().toFile(path.join(root, "src", "app", "apple-icon.png"));
  await sharp(iconSource).resize(192, 192).png().toFile(path.join(root, "public", "icon-192.png"));
  await sharp(iconSource).resize(512, 512).png().toFile(path.join(root, "public", "icon-512.png"));
}

await buildOgImage();
await buildIcons();

console.info(`Optimized ${jobs.length + 1} images and generated app icons`);
