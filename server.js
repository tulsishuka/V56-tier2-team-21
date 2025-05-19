// server.js
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/gemini', async (req, res) => {
  try {
   const model = genAI.getGenerativeModel({
    model: 'gemini-pro'
   })
   const chat = model.startChat({
    history: req.body.history || [],
   })
   const msg = req.body.message;
   const result = await chat.sendMessage(String(msg));
   const response = await result.response;
   const text = response.text();
   res.send(text)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});