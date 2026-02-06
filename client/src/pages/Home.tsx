// src/pages/Home.tsx
import { useState } from "react";
import { askAI } from "../services/ai";
import VoiceListener from "../components/voiceListener";
import MusicPlayer from "../components/musicPlayer";
import Visualizer from "../components/visualizer";

export default function Home() {
    const [text, setText] = useState("");
    const [tracks, setTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const sendPrompt = async (prompt: string) => {
        if (!prompt) return;

        setLoading(true);
        try {
            const data = await askAI(prompt);
            setTracks(data.tracks || []);
        } catch (e) {
            alert("AI failed");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-4">🎧 AI Mood Music</h1>

            {/* TEXT INPUT */}
            <div className="flex gap-2 mb-4">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type how you feel..."
                    className="flex-1 px-4 py-2 rounded bg-gray-900"
                />
                <button
                    onClick={() => sendPrompt(text)}
                    className="px-4 py-2 bg-green-600 rounded"
                >
                    Send
                </button>
            </div>

            {/* VOICE INPUT */}
            <VoiceListener onResult={sendPrompt} />

            {loading && <p className="mt-4 text-gray-400">AI is thinking...</p>}

            <Visualizer />

            <div className="grid md:grid-cols-2 gap-4 mt-6">
                {tracks.map((t, i) => (
                    <MusicPlayer key={i} videoId={t.videoId} />
                ))}
            </div>
        </div>
    );
}
