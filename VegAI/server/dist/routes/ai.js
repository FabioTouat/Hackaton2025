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
    var _a, _b, _c;
    console.log("Received request:", req.body); // Debug
    try {
        const { plant, condition } = req.body;
        if (!process.env.OPENAI_API_KEY) {
            console.error("No OpenAI API key found");
            return res.status(500).json({ message: 'OpenAI API key not configured' });
        }
        const messages = [
            {
                role: "system",
                content: "You are a helpful gardening assistant."
            },
            {
                role: "user",
                content: `Donnez-moi des conseils de jardinage pour cultiver ${plant} dans les conditions suivantes : ${condition}. Réponds uniquement en français et de manière concise.`
            }
        ];
        const completion = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 500,
            temperature: 0.7
        });
        if (!((_a = completion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content)) {
            console.error("No response from OpenAI");
            return res.status(500).json({ message: 'No response from OpenAI' });
        }
        res.json({ advice: completion.data.choices[0].message.content });
    }
    catch (error) {
        console.error("OpenAI API error:", ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
        res.status(500).json({
            message: 'AI service error',
            details: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || error.message
        });
    }
}));
exports.default = router;
