const https = require('https');

const list = [
  { name: 'large-camping-base-shelter', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEOAAiI7f1YoGl-F4eVXB6Yo9Z3EnMuiMOxLyhpLxGxUb0pqMgHUHu-gunWDZRABJc6kQbk9J0gbF8Er-opeug3SEB9zO1ZKJAjFf1eYiOeNQMoYY9tRr4VLQlSBs-55DwLJBDv4FXmGGFm7XPrh2NdgD2SxJ5vGVVdK5RlPV9WSaE5dXnb4_knaV5zWi3Zdg==' },
  { name: 'travel-40l', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFMT2T1U0WA_55J5sV6Sw-ulTZmtgkSpISczeRRUmoRobE-Zxnpk9ueWhnrktMt5vJ-kogBlVrfx0H75_9bl-q81-wyZAHF0PlYfZiDmAfyd9MTF9femlBAKTb1GT2m84sdPBS9AC5ytwuMFEYtGvUEGgK7g8xpTJ5xZR1IkOmcIwrcQ2DqkDANQVNpg-X_9CRJPmJPbedIO5t-rVfe4A==' },
  { name: 'mt500-50l', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzgmoFuTb5hR5KHOggxSwuzJBUiF_rl6aGCTzW0ifRhSTF-M4jlkjw7h0pC8pa8NsmdbSRRmn5NDCyC_4siQqlPP-NXs4EubSDsjjahng8ClCbNFdogSEVfevUwTTYwn4te_bAyiZ-JJWGy9ifPjhYuPq1BZOcIJODGTFDKmKMWRtV' },
  { name: 'walkie-talkie', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGZ1Gv1ljVTZ0FI-tH0aRT8yMAABbIXZiJE5--hxC_nCwkdTe-Jlu08PG9fHq-zipBPw9Unp68dtur3VRyk4Cz_fUoPlNVCN0uhoZOgEWk1xKdG4buHng==' },
  { name: 'flask', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGZmaO7qMCrdQbfBF8CPBG4ykSCrliiaFpszdWIYYZZHyjNZCWB086FOUUsgMRDNWwWpEw1Zi0biXb8Md-l-pduXazKrrrmzi8WDn1WXi6rN4p9DR5m2Z8BKL27B3SL7EuenrxFwYjAHKimIVdonqU_ZZMCMUjznDc6ZZjk_MAgK0s2joC3kcTPcOCVmaELmKtODnMvqLHeNxltK0FyE3Id7ydXORIow_Y3-B7i' }
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
