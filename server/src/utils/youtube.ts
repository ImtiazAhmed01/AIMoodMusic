const axios = require("axios");

const searchYoutube = async (query: string) => {
    // 1️⃣ Search videos
    const searchRes = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
            params: {
                part: "snippet",
                q: query,
                maxResults: 10,
                type: "video",
                key: process.env.YOUTUBE_API_KEY,
            },
        }
    );

    const videoIds = searchRes.data.items
        .filter((v: any) => v.id.videoId)
        .map((v: any) => v.id.videoId);

    // 2️⃣ Get statistics (views, likes)
    const statsRes = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
            params: {
                part: "statistics",
                id: videoIds.join(","),
                key: process.env.YOUTUBE_API_KEY,
            },
        }
    );

    const statsMap: any = {};
    statsRes.data.items.forEach((v: any) => {
        statsMap[v.id] = v.statistics;
    });

    // 3️⃣ Merge + scoring
    return searchRes.data.items
        .filter((v: any) => v.id.videoId)
        .map((v: any) => {
            const stats = statsMap[v.id.videoId] || {};
            const views = parseInt(stats.viewCount || 0);
            const likes = parseInt(stats.likeCount || 0);
            const likeRatio = views ? likes / views : 0;

            // 🔥 Scoring formula
            const score =
                views * 0.5 +
                likeRatio * 1000000 + // amplify ratio
                (Date.now() - new Date(v.snippet.publishedAt).getTime()) *
                -0.0000001;

            return {
                title: v.snippet.title,
                videoId: v.id.videoId,
                channel: v.snippet.channelTitle,
                publishedAt: v.snippet.publishedAt,
                views,
                likes,
                score,
            };
        })
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 5);
};

module.exports = { searchYoutube };
