import express from 'express';
import { VegetableModel } from '../models/vegetable';

const router = express.Router();

// GET /api/vegetables - Récupérer tous les légumes
router.get('/', async (req, res) => {
  try {
    const vegetables = await VegetableModel.find();
    res.status(200).json(vegetables);
  } catch (error) {
    res.status(500).json({
      error: 'Erreur lors de la récupération des légumes',
      details: error
    });
  }
});

export default router; 