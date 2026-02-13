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

// ... other scoring functions ...

/* ---------------- CONTROLLER ---------------- */
// ❌ REMOVE the 'export' keyword here
const searchYoutube = async (req: any, res: any) => {
    try {
        const { query, moodData } = req.body;
        // ... your search logic ...
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).send("Error");
    }
};

/* ---------------- ROUTE ---------------- */
// Ensure 'auth' and 'searchYoutube' are both valid functions
router.post("/search", auth, searchYoutube);

// ✅ Use ONLY module.exports
module.exports = router;