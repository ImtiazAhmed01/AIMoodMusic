const { analyzeWithGroq } = require("../utils/groq");
const { searchYoutube } = require("../utils/youtube");

const generateMusic = async (req: { body: { prompt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; json: (arg0: { refinedPrompt: any; tracks: any; }) => void; }) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt missing" });

        // Use Groq instead of Gemini
        const refinedPrompt = await analyzeWithGroq(prompt);
        console.log("REFINED PROMPT (Groq):", refinedPrompt);

        const tracks = await searchYoutube(refinedPrompt);
        res.json({ refinedPrompt, tracks });

    } catch (e) {
        res.status(500).json({ error: "AI processing failed" });
    }
};
module.exports = { generateMusic };
