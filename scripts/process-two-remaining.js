const https = require('https');
const http = require('http');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const targets = [
  {
    id: 'estwing-e3-24blc',
    url: 'https://www.estwing.com/wp-content/uploads/2026/03/prod_specialty_bricklayer_E3-24BLC_01b_2000x2000.png',
    dest: 'public/images/products/estwing-e3-24blc/hero.webp'
  },
  {
    id: 'generic-geological-pen',
    url: 'https://groz-tools.com/media/catalog/product/cache/bd94e47cda9103c2fc14812ef415a92c/m/s/ms_mg_62.jpg',
    dest: 'public/images/products/generic-geological-pen/hero.webp',
    rejectUnauthorized: false
  }
];

function downloadBuffer(url, rejectUnauthorized = true) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      rejectUnauthorized,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = new URL(redirectUrl, parsed.origin).href;
        }
        return downloadBuffer(redirectUrl, rejectUnauthorized).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${url}: HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
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

async function run() {
  for (const t of targets) {
    console.log(`Downloading ${t.id}...`);
    const buf = await downloadBuffer(t.url, t.rejectUnauthorized !== false);
    const size = await processToCatalogueWebp(buf, t.dest);
    console.log(`Saved ${t.id} -> ${t.dest} (${size} B)`);
  }
}

run().catch(console.error);
