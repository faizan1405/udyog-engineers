const https = require('https');

function getShopifyImages(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const matches = [...data.matchAll(/\/\/(?:www\.)?estwing\.com\/cdn\/shop\/[^"'\s?]+\.(?:jpg|png|webp)/gi)].map(m => 'https:' + m[0].replace(/^https?:/, ''));
        resolve({ url, matches: [...new Set(matches)] });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function test() {
  const targets = [
    'https://www.estwing.com/products/rock-pick-pointed-tip',
    'https://www.estwing.com/products/bricklayer-chisel-edge-hammer'
  ];
  for (const u of targets) {
    const res = await getShopifyImages(u);
    console.log(u.split('/').pop(), res.matches.slice(0, 5));
  }
}

test();
