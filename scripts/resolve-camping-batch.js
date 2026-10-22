const https = require('https');

const targets = [
  // Stoves
  { name: 'portable-camping-gas-stove', redirect: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5rRIApk6s7HImWkrAXd1m0UH14QqRkSn1bhxeBfcsWOBuphHFyddu0K1M8yKfdv7BBTCC1yt4aEv6TZJmVHWGrahcihsKKnPRoxbNHhxngCT0uZhAGmhfO0YkjF1BF-vZZjSFx-4iiJ5-o_EQ5in-Iuo9h3_CZB-oNLhsh2vSazbCKhvMh_LCxO2pL14EfwH3Rccc0Ykb569tg62suIr7mctSvGUlFFXdLgvA78y0H3CIRdkclO6iJn2V' },
  { name: 'stainless-steel-backpacking-stove', redirect: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEYj-yqnKXzv6lsdelN0u8kJKhBILXwO4slqRjhEuGLA6oqVPrjV-ltWARD8TA5E9X7UhRzm3m9B2f4Bpsabe2HIMoPnz6eoDThz3pEG-q049b04-YZ3klsUUb8bvwEmIajm0oio5bfEUEHFznFIgrAXyp43VMjly6drA==' },
  // Cooler & Bottle
  { name: 'ice-cooler-box', redirect: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHiLyb3LFJr-V3EBzb9MQsjSQTu__pfIqm36rSHynInl_p0RqdXbcUimIy6GXfCHO2SLMWugItoo2HUc8LU0bNBrqr_CbLf0BEkygq1ltozX18nRjQLX3iAVsssLoJTrgx2qu98sJESMdfS9saBYnfX1Q==' },
  { name: 'water-purifier-bottle', redirect: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEHH73XYJD1HeVbstdallno5bw4Jx2JMIQUp3xJhanDYjI_nNrc3iLb0hHtlXfL0pK1C1BFgJGPjCEhduOPMrlUg7Jj8tG__D7-VXsyVPQRVzkOmGUoFEL5PJpC9NPUeIDnnYzRB0A2LspZyzR8-vMt4WVayPnDEIWVEZWgTrUrLSeMwfS-sKQAhRAlkyPzfNNDL9wOBGCKXRyhDoq5b_ligojqOITprv1KzQNWVBg43_loxgg4SD295z3EiwvdVBG-zcc=' },
  // Rucksack
  { name: 'trekking-rucksack-60l', redirect: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMqNyjgI3DMTbNgbmanKbUmJKruTvjFKIjQbGa4rffNu5allSNCWGlQg2J8PC6QjY0dlMUftlTAkrM3vgraU2JtH7tsjbldHE2M4l63IeRJ5lyYBnea-a8zJMgGqFOqqhnxvd6IaO3plM3MQ6wMvVdGKSc4Ef40ttIKoD45ZhO5Y8PF3xxxhxr7wOAl1H7Ltla6RBSZF5-' }
];

function getRedirect(url) {
  return new Promise(resolve => {
    https.get(url, res => resolve(res.headers.location));
  });
}

function getOgImage(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
        resolve(og ? og[1] : null);
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  for (const t of targets) {
    const loc = await getRedirect(t.redirect);
    console.log(`\n${t.name} -> ${loc}`);
    if (loc && loc.includes('/p/')) {
      const og = await getOgImage(loc);
      console.log(`  OG: ${og}`);
    }
  }
}

run();
