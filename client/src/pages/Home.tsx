
import VoiceListener from "../components/VoiceListener";
import Visualizer from "../components/Visualizer";
import LanguageSelector from "../components/LanguageSelector";

export default function Home() {
    return (
        <div className="p-6 space-y-4">
            <LanguageSelector />
            <VoiceListener />
            <Visualizer />
        </div>
    );
}
