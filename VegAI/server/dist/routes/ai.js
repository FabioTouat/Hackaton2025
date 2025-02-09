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
const openai_1 = require("openai");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
router.post('/generate-advice', auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plant, condition } = req.body;
        const prompt = `Give me gardening advice for growing ${plant} under these conditions: ${condition}`;
        const completion = yield openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 200
        });
        res.json({ advice: completion.data.choices[0].text });
    }
    catch (error) {
        res.status(500).json({ message: 'AI service error' });
    }
}));
exports.default = router;
