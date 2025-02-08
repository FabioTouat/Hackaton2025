import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import auth from '../middleware/auth';

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/generate-advice', auth, async (req, res) => {
  try {
    const { plant, condition } = req.body;
    const prompt = `Give me gardening advice for growing ${plant} under these conditions: ${condition}`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 200
    });
    res.json({ advice: completion.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: 'AI service error' });
  }
});

export default router; 