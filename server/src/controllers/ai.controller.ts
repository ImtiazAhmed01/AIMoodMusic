const OpenAI = require("openai");
// Use 'import type' for TypeScript interfaces so they are erased at runtime
import type { Request, Response } from "express";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const analyzeMood = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;

        const prompt = `
Analyze the user's mood, preferred music genre and language.
Return ONLY valid JSON.

User text: "${text}"

Format:
{
  "mood": "",
  "genre": "",
  "language": ""
}
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });

        const result = completion.choices[0].message?.content;

        // Safety check for JSON parsing
        if (!result) {
            return res.status(500).json({ error: "Empty response from AI" });
        }

        res.json(JSON.parse(result));
    } catch (err) {
        if (err instanceof Error) {
            console.error("OpenAI Error:", err.message);
        }
        res.status(500).json({ error: "AI analysis failed" });
    }
};

// Use module.exports for CommonJS
module.exports = { analyzeMood };