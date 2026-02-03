const mongoose = require("mongoose");

const UsageSchema = new mongoose.Schema({
    userId: String,
    youtubeCount: { type: Number, default: 0 },
    date: String
});

module.exports = mongoose.model("Usage", UsageSchema);