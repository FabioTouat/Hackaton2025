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
const express_1 = __importDefault(require("express"));
const pot_1 = __importDefault(require("../models/pot"));
const router = express_1.default.Router();
// Enregistrer (créer) un nouveau pot
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPot = new pot_1.default(req.body);
        yield newPot.save();
        res.status(201).json({ message: 'Pot créé avec succès', pot: newPot });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Récupérer tous les pots enregistrés
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pots = yield pot_1.default.find();
        res.status(200).json(pots);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Mise à jour d'un pot avec ses plantes (persistance des plantes)
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPot = yield pot_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPot);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
