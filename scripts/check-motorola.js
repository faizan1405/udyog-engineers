const https = require('https');

https.get('https://www.motorolasolutions.com/en_xu/products/consumer-two-way-radios/talkabout-t82-extreme-walkie-talkies.html', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
    console.log('Motorola OG:', og ? og[1] : null);
    const m = [...d.matchAll(/https:\/\/[^"'\s]+\.(?:png|jpg|webp)/gi)].map(x => x[0]);
    console.log('Images:', m.filter(x => x.includes('t82') || x.includes('talkabout')).slice(0, 5));
  });
});
