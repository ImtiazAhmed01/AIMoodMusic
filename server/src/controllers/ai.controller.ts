// const { analyzeWithGroq } = require("../utils/groq");
// const { searchYoutube } = require("../utils/youtube");

// const generateMusic = async (req: { body: { prompt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; json: (arg0: { refinedPrompt: any; tracks: any; }) => void; }) => {
//     try {
//         const { prompt } = req.body;
//         if (!prompt) return res.status(400).json({ error: "Prompt missing" });

//         // Use Groq instead of Gemini
//         const refinedPrompt = await analyzeWithGroq(prompt);
//         console.log("REFINED PROMPT (Groq):", refinedPrompt);

//         const tracks = await searchYoutube(refinedPrompt);
//         res.json({ refinedPrompt, tracks });

//     } catch (e) {
//         res.status(500).json({ error: "AI processing failed" });
//     }
// };
// module.exports = { generateMusic };
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeEmotion = async (req: { body: { prompt: any; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
        const { prompt } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const aiPrompt = `
Analyze the user's mental state.
Return JSON ONLY:

{
  "mood": "",
  "energy": 0,
  "stress": 0,
  "focus": 0,
  "emotional_load": 0,
  "intent": "",
  "recommendedStyle": "",
  "explanation": ""
}

Scores must be 0-100.

User text: "${prompt}"
`;

        const result = await model.generateContent(aiPrompt);
        const text = result.response.text();

        const cleaned = text.replace(/```json|```/g, "").trim();
        const json = JSON.parse(cleaned);

        res.json(json);

    } catch (err) {
        console.error("AI ERROR:", err);
        res.status(500).json({ error: "AI analysis failed" });
    }
};

module.exports = {
    analyzeEmotion
};
