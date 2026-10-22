const https = require('https');

function getOgImage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const og = data.match(/property="og:image"\s+content="([^"]+)"/i) || data.match(/content="([^"]+)"\s+property="og:image"/i);
        const shopifyMatches = [...data.matchAll(/\/\/(?:www\.)?brunton\.com\/cdn\/shop\/files\/[^"'\s?]+\.(?:jpg|png|webp)/gi)].map(m => 'https:' + m[0].replace(/^https?:/, ''));
        resolve({ url, og: og ? og[1] : null, shopifyMatches: shopifyMatches.slice(0, 3) });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function test() {
  const targets = [
    'https://www.brunton.com/products/compro-pocket-transit',
    'https://www.brunton.com/products/geo-transit',
    'https://www.brunton.com/products/axis-pocket-transit',
    'https://www.brunton.com/products/standard-transit'
  ];
  for (const u of targets) {
    const res = await getOgImage(u);
    console.log(u.split('/').pop());
    console.log('  OG:', res.og);
    console.log('  Shopify:', res.shopifyMatches);
  }
}

test();
