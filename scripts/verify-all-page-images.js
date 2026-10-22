const http = require('http');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function checkAsset(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = `http://localhost:3000${urlPath}`;
    http.get(fullUrl, (res) => {
      resolve({ urlPath, statusCode: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', (err) => resolve({ urlPath, error: err.message }));
  });
}

async function main() {
  const pages = [
    '/',
    '/categories/',
    '/categories/optics/',
    '/categories/gps/',
    '/categories/night-vision/',
    '/categories/thermal/',
    '/categories/geological-equipment/',
    '/categories/camping-equipment/',
    '/categories/weather-station/',
    '/categories/camera-trap/',
    '/products/',
    '/products/gardepro-a60-4k/',
    '/products/gardepro-a5wf/',
    '/products/gardepro-e8wf/',
    '/products/bushnell-core-ds-4k/',
    '/products/bushnell-core-s-4k/',
    '/products/garmin-gpsmap-h1/',
    '/products/nikon-action-8x42/',
    '/products/seek-reveal-300/',
    '/products/estwing-e3-22p/',
    '/products/nightfox-swift/'
  ];

  const allAssets = new Set();
  const pagePlaceholders = [];

  for (const page of pages) {
    const html = await fetchPage(`http://localhost:3000${page}`);
    // extract img src
    const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
    for (const src of imgMatches) {
      // Decode html entities if any
      const cleanSrc = src.replace(/&amp;/g, '&');
      allAssets.add(cleanSrc);
      if (cleanSrc.includes('placeholder')) {
        pagePlaceholders.push({ page, src: cleanSrc });
      }
    }
  }

  console.log(`Audited ${pages.length} pages.`);
  console.log(`Found ${allAssets.size} unique image assets across these pages.`);

  if (pagePlaceholders.length > 0) {
    console.log('PLACEHOLDERS DETECTED:', pagePlaceholders);
  } else {
    console.log('Zero placeholder images found in rendered HTML of tested pages!');
  }

  // Now verify each asset responds 200
  let brokenCount = 0;
  for (const asset of allAssets) {
    if (asset.startsWith('/')) {
      const res = await checkAsset(asset);
      if (res.statusCode !== 200) {
        console.log(`BROKEN ASSET (${res.statusCode}): ${asset}`);
        brokenCount++;
      }
    }
  }

  console.log(`Asset check complete: ${brokenCount} broken assets.`);
}

main();
