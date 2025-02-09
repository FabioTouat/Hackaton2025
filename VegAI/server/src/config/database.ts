import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Définition du schéma pour les légumes
const vegetableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  varieties: [{
    type: String,
    required: true
  }]
});

// Création du modèle Vegetable
const VegetableModel = mongoose.model('Vegetable', vegetableSchema);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env['MONGODB_URI'] as string);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export async function populateVegetables() {
  console.log('Population de la base de données avec les légumes...');
  const vegetables = [
    {
      name: "Tomate",
      varieties: [
        "Coeur de Boeuf",
        "Saint Pierre",
        "Roma",
        "Marmande",
        "Noire de Crimée"
      ]
    },
    {
      name: "Carotte",
      varieties: [
        "Nantaise",
        "De Colmar",
        "Touchon",
        "Purple Haze"
      ]
    },
    {
      name: "Courgette",
      varieties: [
        "Black Beauty",
        "Verte des maraîchers",
        "Gold Rush",
        "Ronde de Nice"
      ]
    },
    {
      name: "Poivron",
      varieties: [
        "California Wonder",
        "Corno di Toro",
        "Yolo Wonder",
        "Chocolat"
      ]
    },
    {
      name: "Aubergine",
      varieties: [
        "Black Beauty",
        "Rosa Bianca",
        "Longue violette",
        "Violette de Florence"
      ]
    },
    {
      name: "Haricot",
      varieties: [
        "Contender",
        "Phénomène",
        "Tendergreen",
        "Blue Lake"
      ]
    },
    {
      name: "Laitue",
      varieties: [
        "Batavia",
        "Feuille de Chêne",
        "Romaine",
        "Iceberg"
      ]
    },
    {
      name: "Pois",
      varieties: [
        "Petit Provençal",
        "Douce Provence",
        "Merveille de Kelvedon",
        "Sugar Snap"
      ]
    },
    {
      name: "Radis",
      varieties: [
        "18 Jours",
        "Flamboyant",
        "Glaçon",
        "Noir Long d'Hiver"
      ]
    },
    {
      name: "Épinard",
      varieties: [
        "Géant d'Hiver",
        "Matador",
        "Viroflay",
        "America"
      ]
    },
    {
      name: "Betterave",
      varieties: [
        "Detroit",
        "Chioggia",
        "Crapaudine",
        "Burpees Golden"
      ]
    },
    {
      name: "Chou",
      varieties: [
        "Coeur de Boeuf",
        "Brunswick",
        "Pointu de Winnigstadt",
        "Rouge de Langendijk"
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

export { VegetableModel };
export default connectDB; 