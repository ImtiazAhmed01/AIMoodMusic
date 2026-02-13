// const { searchYoutube } = require("../utils/youtube");

// const youtubeSearch = async (req: any, res: any) => {
//     const { q } = req.query;
//     const data = await searchYoutube(q);
//     res.json(data);
// };

// module.exports = { youtubeSearch };
// Use 'import' at the top - TypeScript handles the conversion to 'require' for you
const express = require("express");
const axios = require("axios");
const Usage = require("../models/Usage");
const auth = require("../middleware/auth");


const router = express.Router();

/* ---------------- SCORING ---------------- */

const calculateRelevance = (title: string, style: string): number => {
    if (!style) return 10;
    return title.toLowerCase().includes(style.toLowerCase()) ? 50 : 10;
};

const calculateFreshness = (date: string): number => {
    const yearsOld = new Date().getFullYear() - new Date(date).getFullYear();
    return Math.max(0, 20 - yearsOld);
};

const calculateScore = (video: any, moodData: any): number => {
    return (
        calculateRelevance(video.title, moodData?.recommendedStyle) +
        calculateFreshness(video.publishedAt)
    );
};

/* ---------------- CONTROLLER ---------------- */

// ❌ NO 'export' keyword here. Keep it as a local const.
const searchYoutube = async (req: any, res: any) => {
    try {
        const { query, moodData } = req.body;

        if (!query) return res.status(400).json({ error: "Query is required" });

        const ytRes = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: query,
                key: process.env.YOUTUBE_API_KEY,
                maxResults: 10,
                type: "video"
            }
        });

        const videos = ytRes.data.items
            .filter((v: any) => v.id.videoId)
            .map((v: any) => ({
                title: v.snippet.title,
                videoId: v.id.videoId,
                channel: v.snippet.channelTitle,
                publishedAt: v.snippet.publishedAt
            }));

        const ranked = videos
            .map((video: any) => ({
                ...video,
                score: calculateScore(video, moodData)
            }))
            .sort((a: any, b: any) => b.score - a.score)
            .slice(0, 5);

        await Usage.create({
            user: req.user?.id,
            date: new Date(),
            stress: moodData?.stress,
            sessionType: moodData?.stress > 60 ? "stress-reduction" : "focus-boost"
        });

        return res.json({ tracks: ranked });

    } catch (error) {
        console.error("YouTube ERROR:", error);
        return res.status(500).json({ error: "YouTube fetch failed" });
    }
};

/* ---------------- ROUTE ---------------- */

router.post("/search", auth, searchYoutube);

// ✅ This is the CommonJS way to export in a TS file
module.exports = router;