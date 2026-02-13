// const YT_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
// export const fetchYoutube = async (query: string) => {
//     const res = await fetch(
//         `http://localhost:5000/api/youtube?q=${query}&userId=${YT_KEY}`
//     );
//     return res.json();
// };
import axios from "axios";

const API = "http://localhost:5000/api/youtube";

export const searchMusic = async (query: string) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
        `${API}/search`,
        { query },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};
