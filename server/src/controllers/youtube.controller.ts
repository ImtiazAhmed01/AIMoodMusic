// const { searchYoutube } = require("../utils/youtube");

// const youtubeSearch = async (req: any, res: any) => {
//     const { q } = req.query;
//     const data = await searchYoutube(q);
//     res.json(data);
// };

// module.exports = { youtubeSearch };
const express = require("express")
const axios = require("axios")
const Usage = require("../models/Usage")
const auth = require("../middleware/auth")

const router = express.Router()   // ✅ YOU WERE MISSING THIS

/* ---------------- SCORING ---------------- */

const calculateRelevance = (title: string, style: string) => {
    if (!style) return 10
    return title.toLowerCase().includes(style.toLowerCase()) ? 50 : 10
}

const calculateFreshness = (date: string) => {
    const yearsOld =
        new Date().getFullYear() - new Date(date).getFullYear()
    return Math.max(0, 20 - yearsOld)
}

const calculateScore = (video: any, moodData: any) => {
    return (
        calculateRelevance(video.title, moodData?.recommendedStyle) +
        calculateFreshness(video.publishedAt)
    )
}

/* ---------------- CONTROLLER ---------------- */

const searchYoutube = async (req: any, res: any) => {
    try {
        const { query, moodData } = req.body

        if (!query) {
            return res.status(400).json({ error: "Query is required" })
        }

        const ytRes = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
                params: {
                    part: "snippet",
                    q: query,
                    key: process.env.YOUTUBE_API_KEY,
                    maxResults: 10,
                    type: "video"
                }
            }
        )

        const videos = ytRes.data.items
            .filter((v: any) => v.id.videoId)
            .map((v: any) => ({
                title: v.snippet.title,
                videoId: v.id.videoId,
                channel: v.snippet.channelTitle,
                publishedAt: v.snippet.publishedAt
            }))

        const ranked = videos
            .map((video: any) => ({
                ...video,
                score: calculateScore(video, moodData)
            }))
            .sort((a: any, b: any) => b.score - a.score)
            .slice(0, 5)

        const playlist = {
            sessionType:
                moodData?.stress > 60
                    ? "stress-reduction"
                    : "focus-boost",
            duration: "20 min",
            tracks: ranked
        }

        /* ---------- STORE HISTORY ---------- */

        await Usage.create({
            user: req.user?.id, // if auth attaches user
            date: new Date(),
            stress: moodData?.stress,
            energy: moodData?.energy,
            focus: moodData?.focus,
            emotional_load: moodData?.emotional_load,
            sessionType: playlist.sessionType
        })

        return res.json(playlist)

    } catch (error) {
        console.error("YouTube ERROR:", error)
        return res.status(500).json({ error: "YouTube fetch failed" })
    }
}

/* ---------------- ROUTE ---------------- */

router.post("/search", auth, searchYoutube)

module.exports = router   // ✅ EXPORT ROUTER (NOT OBJECT)
