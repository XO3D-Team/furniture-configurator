// app.js

require('dotenv').config();
const express = require('express');
const path = require('path');
const shopifyAPI = require('shopify-api-node');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

const shopify = new shopifyAPI({
  shopName: 'your-shop-name',
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_SECRET,
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/install', (req, res) => {
  const { shop } = req.query;
  if (!shop) {
    return res.status(400).send('Shop parameter is required');
  }
  
  const redirectUri = `${process.env.APP_URL}/callback`;
  const installUrl = shopify.buildAuthURL(shop, redirectUri, process.env.SHOPIFY_API_SCOPES);
  
  res.redirect(installUrl);
});

app.get('/callback', async (req, res) => {
  const { code, shop } = req.query;
  if (!code || !shop) {
    return res.status(400).send('Code and shop parameters are required');
  }
  
  try {
    const accessToken = await shopify.exchangeCode(code);
    // Save accessToken for future requests
  
    res.send('App installed successfully!');
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).send('Error installing app');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
