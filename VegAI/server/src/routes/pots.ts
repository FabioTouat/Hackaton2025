import express from 'express';
import Pot from '../models/pot';

const router = express.Router();

// Enregistrer (créer) un nouveau pot
router.post('/', async (req, res) => {
  try {
    const newPot = new Pot(req.body);
    await newPot.save();
    res.status(201).json({ message: 'Pot créé avec succès', pot: newPot });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Récupérer tous les pots enregistrés
router.get('/', async (req, res) => {
  try {
    const pots = await Pot.find();
    res.status(200).json(pots);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Mise à jour d'un pot avec ses plantes (persistance des plantes)
router.post('/:id', async (req, res) => {
  try {
    const updatedPot = await Pot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPot);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router; 