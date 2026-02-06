const { analyzeWithGemini } = require("../utils/gemini");
const { searchYoutube } = require("../utils/youtube");

const generateMusic = async (req: any, res: any) => {
    try {
        const { prompt } = req.body;

        const refinedPrompt = await analyzeWithGemini(prompt);
        const tracks = await searchYoutube(refinedPrompt);

        res.json({ refinedPrompt, tracks });
    } catch (e) {
        res.status(500).json({ error: "AI processing failed" });
    }
};

module.exports = { generateMusic };
