const https = require('https');

const pages = [
  { name: 'sleeping-bags', url: 'https://www.flipkart.com/sports/camping-hiking/sleeping-bags/men~idealfor/pr?sid=abc,fvf,zuo' },
  { name: 'chairs', url: 'https://www.flipkart.com/sports/camping-hiking/camping-hiking-chairs/pr?sid=abc,fvf,apf' },
  { name: 'table', url: 'https://www.flipkart.com/taithi-sales-portable-folding-camping-table-chair-kit-4-seats-outdoor-picnic-solid-wood/p/itmf10569c5cbbdd' }
];

pages.forEach(p => {
  https.get(p.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', () => {
      const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
      const m = [...d.matchAll(/https:\/\/rukminim2\.flixcart\.com\/image\/(?:1500\/1500|832\/832|612\/612)\/[^"'\s]+\.jpeg/gi)].map(x => x[0]);
      console.log(`\n=== ${p.name} ===`);
      console.log('OG:', og ? og[1] : null);
      console.log('Images:', [...new Set(m)].slice(0, 4));
    });
  });
});
