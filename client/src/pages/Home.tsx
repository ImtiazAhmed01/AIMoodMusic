
import VoiceListener from "../components/voiceListener";
import Visualizer from "../components/visualizer";
import LanguageSelector from "../components/languageSelector";

export default function Home() {
    return (
        <div className="p-6 space-y-4">
            <LanguageSelector />
            <VoiceListener />
            <Visualizer />
        </div>
    );
}
