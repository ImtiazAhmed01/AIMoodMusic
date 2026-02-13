import { useEffect, useState } from "react";
import { askAI } from "../services/ai";
import VoiceListener from "../components/voiceListener";
import MusicPlayer from "../components/musicPlayer";
import Visualizer from "../components/visualizer";

export default function Home() {
    const [text, setText] = useState("");
    const [tracks, setTracks] = useState<any[]>([]);
    const [moodData, setMoodData] = useState<any>(null);
    const [sessionType, setSessionType] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Redirect if not logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    const sendPrompt = async (prompt: string) => {
        if (!prompt.trim()) return;

        setLoading(true);

        try {
            const data = await askAI(prompt);

            // Backend should return:
            // {
            //   sessionType,
            //   duration,
            //   tracks,
            //   moodData
            // }

            setTracks(data.tracks || []);
            setSessionType(data.sessionType || "");
            setMoodData(data.moodData || null);
        } catch (err) {
            console.error(err);
            alert("AI request failed");
        }

        setLoading(false);
    };

    // 🎨 Dynamic background based on stress
    const getBackground = () => {
        if (!moodData) return "bg-black";
        if (moodData.stress > 70) return "bg-indigo-950";
        if (moodData.stress > 40) return "bg-blue-900";
        return "bg-green-900";
    };

    return (
        <div className={`min-h-screen text-white p-6 transition-all ${getBackground()}`}>
            <h1 className="text-3xl font-bold mb-6">
                🎧 AI Mood Music Therapy
            </h1>

            {/* TEXT INPUT */}
            <div className="flex gap-2 mb-4">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell me how you're feeling..."
                    className="flex-1 px-4 py-2 rounded bg-gray-900 outline-none"
                />
                <button
                    onClick={() => sendPrompt(text)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
                >
                    Analyze
                </button>
            </div>

            {/* VOICE INPUT */}
            <VoiceListener onResult={sendPrompt} />

            {/* LOADING */}
            {loading && (
                <p className="mt-4 text-gray-300 animate-pulse">
                    AI is analyzing your emotional state...
                </p>
            )}

            {/* 🧠 MENTAL PANEL */}
            {moodData && (
                <div className="mt-6 bg-black/40 p-6 rounded-xl backdrop-blur">
                    <h2 className="text-xl font-semibold mb-3">
                        🧠 Mental State Analysis
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <p>Stress: {moodData.stress}%</p>
                        <p>Energy: {moodData.energy}%</p>
                        <p>Focus: {moodData.focus}%</p>
                        <p>Emotional Load: {moodData.emotional_load}%</p>
                    </div>

                    <p className="mt-3 text-green-400">
                        Session Type: {sessionType}
                    </p>
                </div>
            )}

            {/* VISUALIZER */}
            <div className="mt-6">
                <Visualizer />
            </div>

            {/* 🎵 PLAYLIST */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
                {tracks.map((track, i) => (
                    <MusicPlayer key={i} videoId={track.videoId} />
                ))}
            </div>
        </div>
    );
}
