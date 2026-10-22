const https = require('https');

const redirectUrl = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRIrzcq8Ti8gc7r_mQr23aQkNDgMooKfiQ7NEJpu90gGxhEDkYQvYxg290jQDCbC2FRV6YaYjeiqW6n0YreZJc-EaR_qFa9XtgZfWMVZR_szam6FeLe_DWbIyc7vjj8B1dP91ZxKA6o5dw5_1B_3zM-cafUUMMTw==';

https.get(redirectUrl, res => {
  console.log('Location:', res.headers.location);
});
