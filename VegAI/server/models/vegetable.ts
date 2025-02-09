import mongoose from 'mongoose';

// Vérifier si le modèle existe déjà
const Vegetable = mongoose.models.Vegetable || mongoose.model('Vegetable', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  varieties: [{
    name: {
      type: String,
      required: true
    },
    maturationDays: {
      type: Number,
      required: true
    }
  }]
}));

export const VegetableModel = Vegetable;

export async function populateVegetables() {
    console.log('Population de la base de données avec les légumes...');
    const vegetables = [
      {
        name: "Tomate",
        varieties: [
          { name: "Coeur de Boeuf", maturationDays: 80 },
          { name: "Saint Pierre", maturationDays: 75 },
          { name: "Roma", maturationDays: 70 },
          { name: "Marmande", maturationDays: 65 },
          { name: "Noire de Crimée", maturationDays: 85 }
        ]
      },
      {
        name: "Carotte",
        varieties: [
          { name: "Nantaise", maturationDays: 70 },
          { name: "De Colmar", maturationDays: 75 },
          { name: "Touchon", maturationDays: 70 },
          { name: "Purple Haze", maturationDays: 75 }
        ]
      },
      {
        name: "Courgette",
        varieties: [
          { name: "Black Beauty", maturationDays: 70 },
          { name: "Verte des maraîchers", maturationDays: 75 },
          { name: "Gold Rush", maturationDays: 70 },
          { name: "Ronde de Nice", maturationDays: 75 }
        ]
      },
      {
        name: "Poivron",
        varieties: [
          { name: "California Wonder", maturationDays: 70 },
          { name: "Corno di Toro", maturationDays: 75 },
          { name: "Yolo Wonder", maturationDays: 70 },
          { name: "Chocolat", maturationDays: 75 }
        ]
      },
      {
        name: "Aubergine",
        varieties: [
          { name: "Black Beauty", maturationDays: 70 },
          { name: "Rosa Bianca", maturationDays: 75 },
          { name: "Longue violette", maturationDays: 70 },
          { name: "Violette de Florence", maturationDays: 75 }
        ]
      },
      {
        name: "Haricot",
        varieties: [
          { name: "Contender", maturationDays: 70 },
          { name: "Phénomène", maturationDays: 75 },
          { name: "Tendergreen", maturationDays: 70 },
          { name: "Blue Lake", maturationDays: 75 }
        ]
      },
      {
        name: "Laitue",
        varieties: [
          { name: "Batavia", maturationDays: 70 },
          { name: "Feuille de Chêne", maturationDays: 75 },
          { name: "Romaine", maturationDays: 70 },
          { name: "Iceberg", maturationDays: 75 }
        ]
      },
      {
        name: "Pois",
        varieties: [
          { name: "Petit Provençal", maturationDays: 70 },
          { name: "Douce Provence", maturationDays: 75 },
          { name: "Merveille de Kelvedon", maturationDays: 70 },
          { name: "Sugar Snap", maturationDays: 75 }
        ]
      },
      {
        name: "Radis",
        varieties: [
          { name: "18 Jours", maturationDays: 70 },
          { name: "Flamboyant", maturationDays: 75 },
          { name: "Glaçon", maturationDays: 70 },
          { name: "Noir Long d'Hiver", maturationDays: 75 }
        ]
      },
      {
        name: "Épinard",
        varieties: [
          { name: "Géant d'Hiver", maturationDays: 70 },
          { name: "Matador", maturationDays: 75 },
          { name: "Viroflay", maturationDays: 70 },
          { name: "America", maturationDays: 75 }
        ]
      },
      {
        name: "Betterave",
        varieties: [
          { name: "Detroit", maturationDays: 70 },
          { name: "Chioggia", maturationDays: 75 },
          { name: "Crapaudine", maturationDays: 70 },
          { name: "Burpees Golden", maturationDays: 75 }
        ]
      },
      {
        name: "Chou",
        varieties: [
          { name: "Coeur de Boeuf", maturationDays: 70 },
          { name: "Brunswick", maturationDays: 75 },
          { name: "Pointu de Winnigstadt", maturationDays: 70 },
          { name: "Rouge de Langendijk", maturationDays: 75 }
        ]
      }
    ];
  
    try {
      for (const veg of vegetables) {
        await VegetableModel.findOneAndUpdate(
          { name: veg.name },
          { 
            name: veg.name,
            varieties: veg.varieties
          },
          { upsert: true }
        );
      }
      console.log('Base de données peuplée avec succès !');
    } catch (error) {
      console.error('Erreur lors du peuplement de la base de données:', error);
    }
  }