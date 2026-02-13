const mongoose = require("mongoose");

const UsageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    stress: Number,
    energy: Number,
    focus: Number,
    emotional_load: Number,

    sessionType: String,

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Usage", UsageSchema);
