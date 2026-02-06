// module.exports = (text: any) => `
// You are a music assistant AI.
// Analyze user intent and return ONLY valid JSON.

// User text: "${text}"

// Rules:
// - mood: happy | sad | energetic | calm | romantic | angry
// - genre: pop | rock | hiphop | classical | lofi | edm | metal
// - language: en | bn | hi | ur

// Return ONLY JSON:
// {
//   "mood": "",
//   "genre": "",
//   "language": ""
// }
// `;
const buildPrompt = (text: string) => `
You are a music assistant.
From the user text extract:
- mood
- language
- genre / artist

Return ONE short YouTube search phrase only.

User: "${text}"
`;

module.exports = { buildPrompt };
