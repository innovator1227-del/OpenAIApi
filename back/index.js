require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        error: "Please provide a valid question.",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt.trim(),
      max_output_tokens: 512,
    });

    res.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI error:", error.message);

    res.status(error.status || 500).json({
      error: "Failed to generate an AI response.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
