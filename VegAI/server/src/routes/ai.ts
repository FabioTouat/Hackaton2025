import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { auth } from '../middleware/auth';

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/generate-advice', auth, async (req, res) => {
  console.log("Received request:", req.body);  // Debug
  try {
    const { plant, condition } = req.body;
    if (!process.env.OPENAI_API_KEY) {
      console.error("No OpenAI API key found");
      return res.status(500).json({ message: 'OpenAI API key not configured' });
    }

    const messages = [
      { 
        role: "system" as const, 
        content: "You are a helpful gardening assistant." 
      },
      {
        role: "user" as const,
        content: `Donnez-moi des conseils de jardinage pour cultiver ${plant} dans les conditions suivantes : ${condition}. Réponds uniquement en français et de manière concise.`
      }
    ];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });

    if (!completion.data.choices[0].message?.content) {
      console.error("No response from OpenAI");
      return res.status(500).json({ message: 'No response from OpenAI' });
    }

    res.json({ advice: completion.data.choices[0].message.content });
  } catch (error: any) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ 
      message: 'AI service error', 
      details: error.response?.data || error.message 
    });
  }
});

export default router; 