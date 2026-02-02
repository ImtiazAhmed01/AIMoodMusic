const axios = require("axios");
// Fix: Corrected the quote placement
const Usage = require("../models/Usage");

// Tip: Using Request and Response types from express makes this much cleaner 
import type { Request, Response } from "express";

const searchYoutube = async (req: Request, res: Response) => {
    const { q, userId } = req.query;
    const today = new Date().toDateString();

    try {
        let usage = await Usage.findOne({ userId, date: today });
        if (!usage) {
            usage = await Usage.create({ userId, date: today });
        }

        if (usage.youtubeCount >= 100) {
            return res.status(429).json({ message: "Daily limit reached" });
        }

        const ytRes = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
                params: {
                    part: "snippet",
                    q,
                    key: process.env.YOUTUBE_API_KEY,
                    maxResults: 1
                }
            }
        );

        usage.youtubeCount++;
        await usage.save();

        res.json({
            video: ytRes.data.items[0],
            remaining: 100 - usage.youtubeCount
        });
    } catch (error: unknown) {
        // Fix: Check if error is an instance of Error to access .message
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};

module.exports = { searchYoutube };