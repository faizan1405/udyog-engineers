const https = require('https');
const http = require('http');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const CAMPING_TARGETS = [
  {
    id: 'camping-tent-4-person',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/tent/a/k/t/portable-waterproof-camping-tent-camp-tent-dome-tents-for-4-original-imaghcuzj5z9nuzy.jpeg',
    dest: 'public/images/products/camping-tent-4-person/hero.webp'
  },
  {
    id: 'camping-tent-6-person',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/tent/3/q/8/sundome-6-person-10-ft-x-10-ft-coleman-resized-original-imahhqkhnphgj3cr.jpeg',
    dest: 'public/images/products/camping-tent-6-person/hero.webp'
  },
  {
    id: 'adventure-camping-tent',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/tent/z/c/h/star-river-2-person-ultralight-backpacking-tent-nh-tent-02-original-imahmjryzpgzfc7z.jpeg',
    dest: 'public/images/products/adventure-camping-tent/hero.webp'
  },
  {
    id: 'car-boot-tent',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/tent/l/a/b/car-awning-sun-shelter-portable-waterproof-car-rear-tent-original-imahn78njpjthxzn.jpeg',
    dest: 'public/images/products/car-boot-tent/hero.webp'
  },
  {
    id: 'portable-privacy-tent',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/tent/p/u/9/pop-up-privacy-camping-tent-portable-outdoor-shower-tent-original-imahctshsxhea4ad.jpeg',
    dest: 'public/images/products/portable-privacy-tent/hero.webp'
  },
  {
    id: 'camping-sleeping-bag',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/sleeping-bag/z/c/t/50-8-extra-large-alaska-7-c-to-0-c-mummy-sleeping-bag-for-adult-original-imahr9vkgxtf2baj.jpeg',
    dest: 'public/images/products/camping-sleeping-bag/hero.webp'
  },
  {
    id: 'multipurpose-camping-tarp',
    url: 'https://contents.mediadecathlon.com/p3088035/5e18861a9e0b828750b07f5ead191fd7/p3088035.jpg',
    dest: 'public/images/products/multipurpose-camping-tarp/hero.webp'
  },
  {
    id: 'camping-shelter',
    url: 'https://contents.mediadecathlon.com/p2583272/788e2ecdd78d02d7332ad3deac50d974/p2583272.jpg',
    dest: 'public/images/products/camping-shelter/hero.webp'
  },
  {
    id: 'large-camping-base-shelter',
    url: 'https://contents.mediadecathlon.com/p2755457/c912af821c97389eacbd4663a0321719/p2755457.jpg',
    dest: 'public/images/products/large-camping-base-shelter/hero.webp'
  },
  {
    id: 'foldable-camping-chair',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/inversion-table-chair/u/f/r/150-folding-camping-chair-portable-fishing-beach-outdoor-resized-original-imahkup9rvymgzhk.jpeg',
    dest: 'public/images/products/foldable-camping-chair/hero.webp'
  },
  {
    id: 'camping-table',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/outdoor-table/h/z/1/100-4-seater-oval-aluminium-850-5-6-picnic-table-taithi-sales-original-imahbchnjzyzz8sz.jpeg',
    dest: 'public/images/products/camping-table/hero.webp'
  },
  {
    id: 'ice-cooler-box',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/general-cooler/v/8/a/insulated-chiller-ice-box-red-62-5-x-36-x-35-5-cm-50-l-aristo-50-original-imahfxtzp4wztmh6.jpeg',
    dest: 'public/images/products/ice-cooler-box/hero.webp'
  },
  {
    id: 'stainless-steel-backpacking-stove',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/camp-stove/u/4/b/1-portable-gas-stove-travelling-camping-stove-folding-furnace-original-imah3hzdwvjsuewc.jpeg',
    dest: 'public/images/products/stainless-steel-backpacking-stove/hero.webp'
  },
  {
    id: 'portable-camping-gas-stove',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/gas-lighter/v/y/5/1-portable-gas-stove-for-outdoor-camping-hiking-mini-gas-stove-original-imah6gr5asbcjmz3.jpeg',
    dest: 'public/images/products/portable-camping-gas-stove/hero.webp'
  },
  {
    id: 'led-headlamp',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/torch/t/d/a/5-1-hunter-rechargeable-led-headlamp-for-outdoor-led-headtorch-original-imahzecrhgnzdgfk.jpeg',
    dest: 'public/images/products/led-headlamp/hero.webp'
  },
  {
    id: 'search-light',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/torch/r/9/q/2-1-rechargeable-led-searchlight-pampa-original-imah3xsbfatzswvk.jpeg',
    dest: 'public/images/products/search-light/hero.webp'
  },
  {
    id: 'camping-torch',
    url: 'https://contents.mediadecathlon.com/p2649465/e2c4c2a107deb0a6d4be365012254d6a/camping-lamp-bl-60-rechargeable-usb-c-and-dynamo-60-lumens.jpg',
    dest: 'public/images/products/camping-torch/hero.webp'
  },
  {
    id: 'licence-free-walkie-talkie',
    url: 'https://www.motorolasolutions.com/content/dam/msi/images/products/two-way-radios/consumer/talkabout-t82-extreme-walkie-talkie.jpg',
    dest: 'public/images/products/licence-free-walkie-talkie/hero.webp'
  },
  {
    id: 'water-purifier-bottle',
    url: 'https://rukminim2.flixcart.com/image/1500/1500/kxp0mfk0/bottle/7/k/n/1000-go-2-stage-clear-water-filter-bottle-for-travel-camping-original-imaga3e7fzefr962.jpeg',
    dest: 'public/images/products/water-purifier-bottle/hero.webp'
  },
  {
    id: 'isothermal-hiking-flask',
    url: 'https://contents.mediadecathlon.com/p1969240/43d06efb0a84ffb8f112ee981cb64264/p1969240.jpg',
    dest: 'public/images/products/isothermal-hiking-flask/hero.webp'
  },
  {
    id: 'trekking-rucksack-under-50l',
    url: 'https://contents.mediadecathlon.com/p3080797/c80b199811d8c7972cd5f96abc00843d/p3080797.jpg',
    dest: 'public/images/products/trekking-rucksack-under-50l/hero.webp'
  },
  {
    id: 'trekking-rucksack-50l',
    url: 'https://contents.mediadecathlon.com/p2986144/4dcaf43470c36f6072d12902385708f5/p2986144.jpg',
    dest: 'public/images/products/trekking-rucksack-50l/hero.webp'
  },
  {
    id: 'trekking-rucksack-60l',
    url: 'https://contents.mediadecathlon.com/p2986123/f51894bf1947be04cfe848dda6056b6e/p2986123.jpg',
    dest: 'public/images/products/trekking-rucksack-60l/hero.webp'
  },
  {
    id: 'trekking-rucksack-70l',
    url: 'https://contents.mediadecathlon.com/p2774777/817b485deda611709fbb75db1d1c1bbb/p2774777.jpg',
    dest: 'public/images/products/trekking-rucksack-70l/hero.webp'
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
  console.log(`Starting processing of ${CAMPING_TARGETS.length} Camping Equipment products...`);
  const results = [];

  for (const item of CAMPING_TARGETS) {
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
