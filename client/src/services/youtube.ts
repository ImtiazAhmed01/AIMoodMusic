const YT_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
export const fetchYoutube = async (query: string) => {
    const res = await fetch(
        `http://localhost:5000/api/youtube?q=${query}&userId=${YT_KEY}`
    );
    return res.json();
};
