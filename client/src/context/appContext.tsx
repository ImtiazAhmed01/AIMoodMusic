import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
    const [mood, setMood] = useState("");
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("en");

    return (
        <AppContext.Provider value={{ mood, genre, language, setMood, setGenre, setLanguage }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
