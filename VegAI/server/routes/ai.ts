import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const router = express.Router();

// Vérification de la configuration OpenAI
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY manquante dans les variables d\'environnement');
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/generate-advice', async (req, res) => {
  
  try {
    const { plant, condition } = req.body;
    
    // Validation des données
    if (!plant || !condition) {
      return res.status(400).json({ 
        message: 'Les champs plant et condition sont requis' 
      });
    }

    const messages = [
      { 
        role: "system", 
        content: "Vous êtes un assistant jardinier expert et serviable." 
      },
      {
        role: "user",
        content: `Donnez-moi des conseils de jardinage pour cultiver ${plant} dans les conditions suivantes : ${condition}. Réponds uniquement en français et en 200 caractères maximum.`
      }

    ];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 200
    });


    res.json({ advice: completion.data.choices[0].message?.content });
  } catch (error: any) {
  
    
    if (error.response) {
      console.error('Erreur OpenAI:', {
        status: error.response.status,
        data: error.response.data
      });
    }

    res.status(500).json({ 
      message: 'AI service error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;