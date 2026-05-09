// Serverless function to securely expose MegaPay config to frontend
// Environment variables must be set in Vercel dashboard

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const apiKey = process.env.MEGAPAY_API_KEY;
  const email = process.env.MEGAPAY_EMAIL;

  if (!apiKey || !email) {
    res.status(500).json({
      error: 'Configuration missing. Please set MEGAPAY_API_KEY and MEGAPAY_EMAIL environment variables in Vercel.'
    });
    return;
  }

  res.status(200).json({
    MEGAPAY_API_KEY: apiKey,
    MEGAPAY_EMAIL: email
  });
};