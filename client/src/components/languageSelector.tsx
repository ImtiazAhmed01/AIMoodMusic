import { useApp } from "../context/AppContext";

export default function LanguageSelector() {
    const { language, setLanguage } = useApp();

    return (
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="bn">Bangla</option>
            <option value="hi">Hindi</option>
            <option value="ur">Urdu</option>
        </select>
    );
}



