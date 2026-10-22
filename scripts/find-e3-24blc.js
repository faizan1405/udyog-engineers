const https = require('https');

https.get('https://www.estwing.com/products/bricklayer-mason-chisel-edge-hammer', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
    console.log('OG image:', og ? og[1] : null);
    const imgs = [...d.matchAll(/src="([^"]+)"/g)].map(x => x[1]).filter(x => x.includes('uploads') || x.includes('products'));
    console.log('Img srcs:', imgs.slice(0, 10));
  });
});

