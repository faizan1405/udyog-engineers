const https = require('https');

function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ url, status: res.statusCode, length: res.headers['content-length'] });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function run() {
  const urls = [
    'https://www.batronix.com/images/generated/ai56-5-1200x735-White-b.jpg',
    'https://www.batronix.com/images/generated/fb21-1-1200x1200-White-min.jpg',
    'https://robu-prod-media.s3.ap-south-1.amazonaws.com/uploads/2025/08/R251606_11.jpg',
    'https://media.toolbuy.com/products/2026/09/bd5d688eddad41f6a4ba0b9f3e3d138e-product030926025748ameco-v-v1.webp'
  ];
  for (const u of urls) {
    const res = await testUrl(u);
    console.log(res.status, res.length ? res.length + ' B' : '', u.split('/').pop());
  }
}

run();
