const https = require('https');

https.get('https://www.decathlon.in/p/8947731/multi-purpose-camping-shelter-tarp-size-l', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
    console.log('OG image:', og ? og[1] : null);
    const m = [...d.matchAll(/https:\/\/contents\.mediadecathlon\.com\/[^\s"']+\.jpg/gi)].map(x => x[0]);
    console.log('Decathlon CDN matches:', [...new Set(m)].slice(0, 5));
  });
});
