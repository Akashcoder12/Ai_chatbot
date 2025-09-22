import express from 'express';
import { GoogleGenAI } from "@google/genai";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const history = [];

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  history.push({ role: "user", parts: [{ text: message }] });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history
    });

    history.push({ role: "model", parts: [{ text: response.text }] });

    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
