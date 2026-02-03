import { useApp } from "../context/appContext"
export default function languageSelector() {
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



