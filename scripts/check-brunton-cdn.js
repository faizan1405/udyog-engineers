const https = require('https');

function checkHead(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode, length: res.headers['content-length'] });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function test() {
  const urls = [
    'https://www.brunton.com/cdn/shop/products/E-WEB-LB-5008-1.jpg',
    'https://www.brunton.com/cdn/shop/files/E-WEB-LB-5008-1.jpg',
    'https://www.brunton.com/cdn/shop/products/E-WEB-LB-5010-1.jpg',
    'https://www.brunton.com/cdn/shop/products/E-WEB-LB-5012-1.jpg',
    'https://www.brunton.com/cdn/shop/files/E-WEB-LB-5012-OR-3.jpg',
    'https://www.brunton.com/cdn/shop/products/E-WEB-LB-5020-1.jpg',
    'https://www.brunton.com/cdn/shop/files/E-WEB-LB-5020-1.jpg',
    'https://www.brunton.com/cdn/shop/files/E-WEB-LB-TRUARC15-NEW-1.jpg'
  ];
  for (const u of urls) {
    const res = await checkHead(u);
    console.log(res.status, res.length ? res.length + ' B' : '', u.split('/').pop());
  }
}

test();
