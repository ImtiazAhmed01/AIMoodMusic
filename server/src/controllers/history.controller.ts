const Usage = require("../models/Usage");

const getHistory = async (req: any, res: any) => {
    try {
        const history = await Usage.find()
            .sort({ createdAt: 1 })
            .select("stress energy focus emotional_load createdAt");

        res.json(history);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
};

module.exports = { getHistory };
const Usage = require("../models/Usage");

const getHistory = async (req: any, res: any) => {
    const history = await Usage.find({ userId: req.userId })
        .sort({ createdAt: 1 });

    res.json(history);
};

module.exports = { getHistory };
