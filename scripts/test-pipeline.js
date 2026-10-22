const https = require('https');
const http = require('http');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
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

  // Resize product image to fit nicely within the max bounds
  const resized = await sharp(inputBuffer)
    .resize(maxW, maxH, {
      fit: 'inside',
      withoutEnlargement: false,
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .toBuffer();

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Composite centered onto pure white 1200x900 canvas
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
  console.log(`Saved: ${outputPath} (${stats.size} bytes)`);
}

async function run() {
  const url = 'https://res.garmin.com/transform/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.0,f_auto,h_800,q_auto,w_800/v1/Product_Images/en/products/010-01772-10/v/cf-lg?pgw=1';
  console.log('Testing download of Foretrex 701...');
  const buf = await downloadBuffer(url);
  console.log('Downloaded buffer size:', buf.length);
  await processToCatalogueWebp(buf, 'public/images/products/garmin-foretrex-701-ballistic/hero.webp');
}

run().catch(console.error);
