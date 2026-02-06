const axios = require("axios");
const { buildPrompt } = require("./aiPrompt");

const analyzeWithGemini = async (text: string) => {
    const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            contents: [
                { parts: [{ text: buildPrompt(text) }] }
            ]
        }
    );

    return res.data.candidates[0].content.parts[0].text;
};

module.exports = { analyzeWithGemini };
