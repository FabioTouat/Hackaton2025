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
if (mongoose_1.default.models.Vegetable) {
    delete mongoose_1.default.models.Vegetable;
}
// Définition du schéma Vegetable
const VegetableSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    // Champ pour stocker le lien de l'image situé dans le dossier assets
    imageUrl: {
        type: String,
        required: false
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
});
const Vegetable = mongoose_1.default.models.Vegetable || mongoose_1.default.model('Vegetable', VegetableSchema);
exports.VegetableModel = Vegetable;
function populateVegetables() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Population de la base de données avec les légumes...');
        const vegetables = [
            {
                name: "Tomate",
                imageUrl: "/assets/vegetables/tomate.jpg",
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
                imageUrl: "/assets/vegetables/carotte.webp",
                varieties: [
                    { name: "Nantaise", maturationDays: 70 },
                    { name: "De Colmar", maturationDays: 75 },
                    { name: "Touchon", maturationDays: 70 },
                    { name: "Purple Haze", maturationDays: 75 }
                ]
            },
            {
                name: "Courgette",
                imageUrl: "/assets/vegetables/courgette.webp",
                varieties: [
                    { name: "Black Beauty", maturationDays: 70 },
                    { name: "Verte des maraîchers", maturationDays: 75 },
                    { name: "Gold Rush", maturationDays: 70 },
                    { name: "Ronde de Nice", maturationDays: 75 }
                ]
            },
            {
                name: "Poivron",
                imageUrl: "/assets/vegetables/poivron.jpg",
                varieties: [
                    { name: "California Wonder", maturationDays: 70 },
                    { name: "Corno di Toro", maturationDays: 75 },
                    { name: "Yolo Wonder", maturationDays: 70 },
                    { name: "Chocolat", maturationDays: 75 }
                ]
            },
            {
                name: "Aubergine",
                imageUrl: "/assets/vegetables/aubergine.jpg",
                varieties: [
                    { name: "Black Beauty", maturationDays: 70 },
                    { name: "Rosa Bianca", maturationDays: 75 },
                    { name: "Longue violette", maturationDays: 70 },
                    { name: "Violette de Florence", maturationDays: 75 }
                ]
            },
            {
                name: "Haricot",
                imageUrl: "/assets/vegetables/haricot.jpg",
                varieties: [
                    { name: "Contender", maturationDays: 70 },
                    { name: "Phénomène", maturationDays: 75 },
                    { name: "Tendergreen", maturationDays: 70 },
                    { name: "Blue Lake", maturationDays: 75 }
                ]
            },
            {
                name: "Laitue",
                imageUrl: "/assets/vegetables/laitue.webp",
                varieties: [
                    { name: "Batavia", maturationDays: 70 },
                    { name: "Feuille de Chêne", maturationDays: 75 },
                    { name: "Romaine", maturationDays: 70 },
                    { name: "Iceberg", maturationDays: 75 }
                ]
            },
            {
                name: "Pois",
                imageUrl: "/assets/vegetables/pois.png",
                varieties: [
                    { name: "Petit Provençal", maturationDays: 70 },
                    { name: "Douce Provence", maturationDays: 75 },
                    { name: "Merveille de Kelvedon", maturationDays: 70 },
                    { name: "Sugar Snap", maturationDays: 75 }
                ]
            },
            {
                name: "Radis",
                imageUrl: "/assets/vegetables/radis.webp",
                varieties: [
                    { name: "18 Jours", maturationDays: 70 },
                    { name: "Flamboyant", maturationDays: 75 },
                    { name: "Glaçon", maturationDays: 70 },
                    { name: "Noir Long d'Hiver", maturationDays: 75 }
                ]
            },
            {
                name: "Épinard",
                imageUrl: "/assets/vegetables/epinard.jpg",
                varieties: [
                    { name: "Géant d'Hiver", maturationDays: 70 },
                    { name: "Matador", maturationDays: 75 },
                    { name: "Viroflay", maturationDays: 70 },
                    { name: "America", maturationDays: 75 }
                ]
            },
            {
                name: "Betterave",
                imageUrl: "/assets/vegetables/betterave.jpg",
                varieties: [
                    { name: "Detroit", maturationDays: 70 },
                    { name: "Chioggia", maturationDays: 75 },
                    { name: "Crapaudine", maturationDays: 70 },
                    { name: "Burpees Golden", maturationDays: 75 }
                ]
            },
            {
                name: "Chou",
                imageUrl: "/assets/vegetables/chou.jpg",
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
                yield exports.VegetableModel.findOneAndUpdate({ name: veg.name }, {
                    name: veg.name,
                    varieties: veg.varieties,
                    imageUrl: veg.imageUrl
                }, { upsert: true });
            }
            console.log('Base de données peuplée avec succès !');
        }
        catch (error) {
            console.error('Erreur lors du peuplement de la base de données:', error);
        }
    });
}
