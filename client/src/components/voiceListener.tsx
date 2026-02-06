// src/components/voiceListener.tsx
export default function VoiceListener({
    onResult
}: {
    onResult: (text: string) => void;
}) {
    const startListening = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            onResult(text);
        };

        recognition.start();
    };

    return (
        <button
            onClick={startListening}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
            🎙 Speak
        </button>
    );
}
