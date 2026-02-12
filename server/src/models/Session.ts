const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        skips: Number,
        duration: Number,
        active: Boolean,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
