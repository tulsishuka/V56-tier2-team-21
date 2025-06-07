import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); // Loads .env variables into process.env

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  const params = new URLSearchParams({
    client_id: process.env.VITE_GITHUB_CLIENT_ID,
    client_secret: process.env.VITE_GITHUB_CLIENT_SECRET,
    code,
  });

  const BASE_URL = process.env.VITE_SERVER_BASE_URL;

  try {
    const response = await fetch(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching access token:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getUserData', async (req, res) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: authHeader,
        'User-Agent': 'Github-OAuth-App',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at ${BASE_URL}:${PORT}`);
});