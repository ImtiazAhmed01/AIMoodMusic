const axios = require("axios");
const { buildPrompt } = require("./aiPrompt");

const analyzeWithGroq = async (text: any) => {
    try {
        const res = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile", // High-speed, high-quality model
                messages: [
                    {
                        role: "user",
                        content: buildPrompt(text),
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const output = res.data?.choices?.[0]?.message?.content;

        if (!output) throw new Error("Empty Groq response");

        return output.trim();
    } catch (err) {
        console.error("🔥 Groq API Error:", err.response?.data || err.message);
        throw err;
    }
};

module.exports = { analyzeWithGroq };