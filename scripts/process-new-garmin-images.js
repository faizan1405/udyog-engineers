const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const NEW_GARMIN_PRODUCTS = [
  {
    id: 'garmin-etrex-22x',
    name: 'Garmin eTrex 22x',
    url: 'https://res.garmin.com/en/products/010-02256-00/g/cf-lg-c904d488-016e-4120-9b38-f6f4a88b8d3f.jpg',
    dest: 'public/images/products/garmin-etrex-22x/hero.webp'
  },
  {
    id: 'garmin-gpsmap-65s',
    name: 'Garmin GPSMAP 65s',
    url: 'https://res.garmin.com/en/products/010-02451-10/g/cf-lg-c69aa526-2abe-4c3c-971b-f6fb393eca08.jpg',
    dest: 'public/images/products/garmin-gpsmap-65s/hero.webp'
  },
  {
    id: 'garmin-gpsmap-79s',
    name: 'Garmin GPSMAP 79s',
    url: 'https://res.garmin.com/en/products/010-02635-00/v/cf-lg-0f2560a6-e475-4fd0-99b4-a3921af2c86d-1.jpg',
    dest: 'public/images/products/garmin-gpsmap-79s/hero.webp'
  }
];

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${url}: HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function processToCatalogueWebp(inputBuffer, outputPath, options = {}) {
  const targetW = 1200;
  const targetH = 900;
  const fillRatio = options.fillRatio || 0.82;
  const maxW = Math.round(targetW * fillRatio);
  const maxH = Math.round(targetH * fillRatio);

  const resized = await sharp(inputBuffer)
    .resize(maxW, maxH, {
      fit: 'inside',
      withoutEnlargement: false,
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .toBuffer();

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp({
    create: {
      width: targetW,
      height: targetH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    {
      input: resized,
      gravity: 'center'
    }
  ])
  .webp({ quality: 90, effort: 5 })
  .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  return stats.size;
}

async function main() {
  console.log(`Processing ${NEW_GARMIN_PRODUCTS.length} Garmin product images...`);
  for (const item of NEW_GARMIN_PRODUCTS) {
    console.log(`\nFetching ${item.name} (${item.id}) from ${item.url}...`);
    const buf = await downloadBuffer(item.url);
    console.log(`  Downloaded: ${buf.length} bytes`);
    const size = await processToCatalogueWebp(buf, item.dest);
    const meta = await sharp(item.dest).metadata();
    console.log(`  ✓ Saved ${item.dest}: ${size} bytes (${meta.width}x${meta.height}, ${meta.format})`);
  }
}

main().catch(console.error);
