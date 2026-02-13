import { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
    user: any;
    setUser: (user: any) => void;
    logout: () => void;
    mood: string;
    genre: string;
    language: string;
    setMood: (m: string) => void;
    setGenre: (g: string) => void;
    setLanguage: (l: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const [mood, setMood] = useState("");
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("en");

    // ✅ Load user from token (basic example)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token }); // or decode JWT if needed
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                logout,
                mood,
                genre,
                language,
                setMood,
                setGenre,
                setLanguage
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used inside AppProvider");
    }
    return context;
};
