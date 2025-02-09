"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VegetableModel = void 0;
exports.populateVegetables = populateVegetables;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Définition du schéma pour les légumes
const vegetableSchema = new mongoose_1.default.Schema({
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
const VegetableModel = mongoose_1.default.model('Vegetable', vegetableSchema);
exports.VegetableModel = VegetableModel;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env['MONGODB_URI']);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
});
function populateVegetables() {
    return __awaiter(this, void 0, void 0, function* () {
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
                yield VegetableModel.findOneAndUpdate({ name: veg.name }, {
                    name: veg.name,
                    varieties: veg.varieties
                }, { upsert: true });
            }
            console.log('Base de données peuplée avec succès !');
        }
        catch (error) {
            console.error('Erreur lors du peuplement de la base de données:', error);
        }
    });
}
exports.default = connectDB;
