const https = require('https');
const http = require('http');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const BRANDED_TARGETS = [
  // Night Vision (3)
  {
    id: 'nightfox-ember',
    url: 'https://in.nightfoxstore.com/cdn/shop/files/Laserware_Nightfox_Ember_Listing_Image_2_1.png',
    dest: 'public/images/products/nightfox-ember/hero.webp'
  },
  {
    id: 'nightfox-vulpes-hd',
    url: 'https://in.nightfoxstore.com/cdn/shop/products/Laserware_Nightfox_Vulpes_Animal_Image_3_3.png',
    dest: 'public/images/products/nightfox-vulpes-hd/hero.webp'
  },
  {
    id: 'nightfox-swift',
    url: 'https://in.nightfoxstore.com/cdn/shop/files/Laserware_Nightfox_Swift_Main_Listing_Image_1_Option_2_e1c4b7fb-0edc-4ec9-af65-50da4eec7895.png',
    dest: 'public/images/products/nightfox-swift/hero.webp'
  },

  // Thermal HIKMICRO (4)
  {
    id: 'hikmicro-ai56',
    url: 'https://www.batronix.com/images/generated/ai56-5-1200x735-White-b.jpg',
    dest: 'public/images/products/hikmicro-ai56/hero.webp'
  },
  {
    id: 'hikmicro-fb21',
    url: 'https://www.batronix.com/images/generated/fb21-1-1200x1200-White-min.jpg',
    dest: 'public/images/products/hikmicro-fb21/hero.webp'
  },
  {
    id: 'hikmicro-eco',
    url: 'https://robu-prod-media.s3.ap-south-1.amazonaws.com/uploads/2025/08/R251606_11.jpg',
    dest: 'public/images/products/hikmicro-eco/hero.webp'
  },
  {
    id: 'hikmicro-eco-v',
    url: 'https://media.toolbuy.com/products/2026/09/bd5d688eddad41f6a4ba0b9f3e3d138e-product030926025748ameco-v-v1.webp',
    dest: 'public/images/products/hikmicro-eco-v/hero.webp'
  },

  // Brunton (5)
  {
    id: 'brunton-f-5008-compro',
    url: 'https://www.brunton.com/cdn/shop/products/E-WEB-LB-5008-1.jpg',
    dest: 'public/images/products/brunton-f-5008-compro/hero.webp'
  },
  {
    id: 'brunton-f-5010-geo',
    url: 'https://www.brunton.com/cdn/shop/products/E-WEB-LB-5010-1.jpg',
    dest: 'public/images/products/brunton-f-5010-geo/hero.webp'
  },
  {
    id: 'brunton-f-5012-axis',
    url: 'https://www.brunton.com/cdn/shop/products/E-WEB-LB-5012-1.jpg',
    dest: 'public/images/products/brunton-f-5012-axis/hero.webp'
  },
  {
    id: 'brunton-f-5020-standard',
    url: 'https://www.brunton.com/cdn/shop/products/E-WEB-LB-5020-1.jpg',
    dest: 'public/images/products/brunton-f-5020-standard/hero.webp'
  },
  {
    id: 'brunton-truarc-15',
    url: 'https://www.brunton.com/cdn/shop/files/E-WEB-LB-TRUARC15-NEW-1.jpg',
    dest: 'public/images/products/brunton-truarc-15/hero.webp'
  },

  // Suunto (3)
  {
    id: 'suunto-mc-2',
    url: 'https://www.suunto.com/globalassets/productimages/suunto-mc-2/ss004242001-frontmc-2_360_d_cm_in_nh-compass.png',
    dest: 'public/images/products/suunto-mc-2/hero.webp'
  },
  {
    id: 'suunto-kb-20',
    url: 'https://www.suunto.com/globalassets/productimages/suunto-kb-new-images/ss020419000_suunto-kb-20_360r_g.png',
    dest: 'public/images/products/suunto-kb-20/hero.webp'
  },
  {
    id: 'suunto-pm-5-clinometer',
    url: 'https://www.suunto.com/globalassets/productimages/suunto-pm-5-360-pc/ss011096010_suunto_pm-5_360pc-v2.png',
    dest: 'public/images/products/suunto-pm-5-clinometer/hero.webp'
  },

  // Estwing (3)
  {
    id: 'estwing-e3-22p',
    url: 'https://www.estwing.com/wp-content/uploads/2026/03/E3-22P_Hero_3000x3000_22-scaled.png',
    dest: 'public/images/products/estwing-e3-22p/hero.webp'
  },
  {
    id: 'estwing-e3-14p',
    url: 'https://m.media-amazon.com/images/I/61HOXVOajWL._AC_SL1500_.jpg',
    dest: 'public/images/products/estwing-e3-14p/hero.webp'
  },
  {
    id: 'estwing-e3-24blc',
    url: 'https://www.estwing.com/wp-content/uploads/2026/03/E3-24BLC_Beauty_3000x3000_24.png',
    dest: 'public/images/products/estwing-e3-24blc/hero.webp'
  },

  // Breithaupt (1)
  {
    id: 'breithaupt-3031-cothi',
    url: 'https://www.ascscientific.com/cdn/shop/products/3031-GEKOM.jpg',
    dest: 'public/images/products/breithaupt-3031-cothi/hero.webp'
  },

  // Field Accessories (3)
  {
    id: 'generic-geological-pen',
    url: 'https://groz-tools.com/media/catalog/product/cache/bd94e47cda9103c2fc14812ef415a92c/m/s/ms_mg_62.jpg',
    dest: 'public/images/products/generic-geological-pen/hero.webp'
  },
  {
    id: 'generic-geological-lens',
    url: 'https://mediacdn.nhbs.com/jackets/jackets_orig/jpics/202599.png',
    dest: 'public/images/products/generic-geological-lens/hero.webp'
  },
  {
    id: 'generic-geological-diary',
    url: 'https://cdn11.bigcommerce.com/s-x213q4dopz/images/stencil/1280x1280/products/586744/356421/RIT373BL__31059.1729276699.jpg?c=1',
    dest: 'public/images/products/generic-geological-diary/hero.webp'
  }
];

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
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
        return downloadBuffer(redirectUrl).then(resolve).catch(reject);
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
  console.log(`Starting processing of ${BRANDED_TARGETS.length} products...`);
  const results = [];

  for (const item of BRANDED_TARGETS) {
    try {
      console.log(`\nFetching ${item.id} from ${item.url}...`);
      const buf = await downloadBuffer(item.url);
      console.log(`  Downloaded: ${buf.length} bytes`);
      const size = await processToCatalogueWebp(buf, item.dest);
      console.log(`  Processed & Saved to ${item.dest}: ${size} bytes`);
      results.push({ id: item.id, status: 'SUCCESS', size, url: item.url });
    } catch (err) {
      console.error(`  ERROR for ${item.id}:`, err.message);
      results.push({ id: item.id, status: 'FAILED', error: err.message, url: item.url });
    }
  }

  console.log('\n================ SUMMARY ================');
  results.forEach(r => {
    console.log(`${r.id.padEnd(35)} : ${r.status} ${r.size ? '(' + r.size + ' B)' : r.error}`);
  });
}

main().catch(console.error);
