import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const analyzeVoice = async (req: any, res: any) => {
    const { text } = req.body;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: PROMPT },
            { role: "user", content: text }
        ]
    });

    res.json(JSON.parse(completion.choices[0].message.content));
};
