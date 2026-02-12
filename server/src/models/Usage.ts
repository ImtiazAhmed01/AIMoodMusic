const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema(
    {
        userId: String,
        stress: Number,
        energy: Number,
        focus: Number,
        emotional_load: Number,
        sessionType: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Usage", usageSchema);
