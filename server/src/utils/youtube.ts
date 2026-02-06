const axios = require("axios");

const searchYoutube = async (query: string) => {
    const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
            params: {
                part: "snippet",
                q: query,
                maxResults: 8,
                type: "video",
                key: process.env.YOUTUBE_API_KEY
            }
        }
    );

    return res.data.items.map((v: any) => ({
        title: v.snippet.title,
        videoId: v.id.videoId
    }));
};

module.exports = { searchYoutube };
