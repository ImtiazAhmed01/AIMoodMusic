const YT_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
export const searchYouTube = async (query: string) => {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YT_KEY}`
    );
    return res.json();
};
