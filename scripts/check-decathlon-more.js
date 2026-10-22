const https = require('https');

const list = [
  { name: 'rucksack-60l', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQErvpvxr1U_cmWPgLSTpcWwt8Kjr2_FaJYgnBZqi5e6EfM2s2pXtoclqx2RY1ZKM6GkaPzcxsR-8cjfmeknm3RGH_5I9z_gpMXHEYdwr_IOif8Em4G_kuSXQfFGYv22dDRLlVD7w4r8Jc3rWWbnvoPZauuye89uK0DCOkCYf-SjAKYV' },
  { name: 'rucksack-70l', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkM0Rs25AnCf1rHhSPfJS_X-hRtI6JeP0CdysK7Af-XpHVom-bkhGCLE_SzVK8mvBFYqY-d4mR28dmNcgfivlEXcVoDBCq-ZPdczy6AmWc_7pcRcfqMqWK3y9CSmIBXD-8_NSzVjq6VRWxW8uH2lT86WCfHSnprkI=' },
  { name: 'camping-shelter', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGyR_rq00QW_tBiE28hEmeKlKT1l8jh_szYJ8QJP9V8zB_4A_dp3OBSJ3RxgWyAWu-OtNid8a41leRoa8AoCQV-IP18WHXBq7jLGYwI9t3sDm5DBlL7Q0FHgwmIAv6IQ2aQ2EyDj8b1' }
];

async function check() {
  for (const item of list) {
    const loc = await new Promise(r => https.get(item.url, res => r(res.headers.location)));
    console.log(item.name, '->', loc);
    if (loc) {
      https.get(loc, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        let d = ''; res.on('data', c => d += c);
        res.on('end', () => {
          const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
          console.log(`  ${item.name} OG:`, og ? og[1] : null);
        });
      });
    }
  }
}

check();
