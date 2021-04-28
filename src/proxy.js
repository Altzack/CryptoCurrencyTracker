const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://pro-api.coinmarketcap.com/',
    changeOrigin: true,
  })
);
app.listen(3001);
