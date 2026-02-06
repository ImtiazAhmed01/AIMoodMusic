// src/services/ai.ts
export const askAI = async (prompt: string) => {
    const res = await fetch("http://localhost:5000/ai/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
    });

    if (!res.ok) {
        throw new Error("AI request failed");
    }

    return res.json();
};
