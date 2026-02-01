/* eslint-disable @typescript-eslint/no-explicit-any */
const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

export default function VoiceListener({ onResult }: any) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.lang = localStorage.getItem("lang") || "en-US";

    recognition.onresult = (event: any) => {
        const text = event.results[event.results.length - 1][0].transcript;
        onResult(text);
    };

    recognition.start();
    return null;
}
