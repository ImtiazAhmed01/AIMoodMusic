import { useState } from "react";
import { searchMusic } from "../services/youtube";
import MusicPlayer from "../components/musicPlayer";
import VoiceListener from "../components/voiceListener";

export default function Home() {
    const [text, setText] = useState("");
    const [playlist, setPlaylist] = useState<any>(null);
    const [therapyMode, setTherapyMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (input: string) => {
        if (!input) return;
        setLoading(true);
        const data = await searchMusic(input);
        setPlaylist(data);
        setLoading(false);
    };

    const mood = playlist?.moodData;

    const getTheme = () => {
        if (!mood) return "bg-black";
        if (mood.stress > 70) return "bg-indigo-950";
        if (mood.stress > 40) return "bg-blue-900";
        return "bg-green-900";
    };

    const Bar = ({ value }: any) => (
        <div className="w-full bg-gray-700 h-3 rounded mb-2">
            <div
                className="bg-green-400 h-3 rounded"
                style={{ width: `${value}%` }}
            />
        </div>
    );

    return (
        <div className={`min-h-screen text-white p-6 ${getTheme()}`}>
            <h1 className="text-3xl font-bold mb-6">AI Mood Therapy</h1>

            <div className="flex gap-2">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="flex-1 p-3 bg-gray-800 rounded"
                    placeholder="How are you feeling?"
                />
                <button
                    onClick={() => handleSearch(text)}
                    className="bg-green-600 px-6 rounded"
                >
                    Analyze
                </button>
            </div>

            <VoiceListener onResult={handleSearch} />

            {loading && <p className="mt-4">Analyzing mental state...</p>}

            {playlist && (
                <>
                    {/* AI Insight Panel */}
                    <div className="mt-6 bg-black/40 p-6 rounded-xl">
                        <h2 className="text-xl font-bold">
                            🎧 Detected Mood: {mood.mood}
                        </h2>
                        <p>🧠 AI Goal: {mood.intent}</p>
                        <p>🎼 Style: {mood.recommendedStyle}</p>

                        <div className="mt-4">
                            <p>Stress {mood.stress}%</p>
                            <Bar value={mood.stress} />

                            <p>Energy {mood.energy}%</p>
                            <Bar value={mood.energy} />

                            <p>Focus {mood.focus}%</p>
                            <Bar value={mood.focus} />
                        </div>
                    </div>

                    {/* Therapy Mode */}
                    <button
                        onClick={() => setTherapyMode(!therapyMode)}
                        className="mt-6 bg-purple-600 px-4 py-2 rounded"
                    >
                        🔒 Therapy Mode {therapyMode ? "ON" : "OFF"}
                    </button>

                    {!therapyMode && (
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            {playlist.tracks.map((t: any, i: number) => (
                                <MusicPlayer key={i} videoId={t.videoId} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
