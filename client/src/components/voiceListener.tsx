import { analyzeMood } from "../services/ai";
import { useApp } from "../context/appContext";

export default function VoiceListener() {
    const { setMood, setGenre, setLanguage } = useApp();

    const startListening = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";

        recognition.onresult = async (e: any) => {
            const text = e.results[0][0].transcript;
            const data = await analyzeMood(text);
            setMood(data.mood);
            setGenre(data.genre);
            setLanguage(data.language);
        };

        recognition.start();
    };

    return (
        <button onClick={startListening} className="px-4 py-2 bg-green-500 text-white rounded">
            🎙 Speak
        </button>
    );
}
