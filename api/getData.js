const axios = require('axios');

export default async function handler(req, res) {
  // Get the API key from environment variables (we'll set this in Vercel)
  const API_KEY = process.env.API_KEY; 

  try {
    const response = await axios.get(`https://api.example.com/data?api_key=${API_KEY}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
