"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Schéma pour une plante (sous-document)
const plantSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    variety: { type: String, required: true },
    quantity: { type: Number, required: true },
    plantingDate: { type: String, required: true },
    harvestDate: { type: String }
}); // Optionnel : désactive l'_id pour chaque sous-document
// Schéma pour un pot
const potSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    plants: [plantSchema], // Liste de plantes
    autoWatering: { type: Boolean, required: true },
    size: {
        width: { type: Number, required: true },
        height: { type: Number, required: true }
    },
    sensors: {
        infrared: { type: String, required: true },
        npr: { type: String, required: true }
    }
});
const Pot = mongoose_1.default.models.Pot || mongoose_1.default.model('Pot', potSchema);
exports.default = Pot;
