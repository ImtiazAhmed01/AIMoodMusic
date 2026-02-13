import axios from "axios";

const API = "http://localhost:5000/api/youtube";

export const askAI = async (prompt: string) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
        `${API}/search`,
        { query: prompt },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};
