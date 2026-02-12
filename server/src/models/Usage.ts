const mongoose = require("mongoose")

const usageSchema = new mongoose.Schema({
    date: String,
    stress: Number,
    energy: Number,
    focus: Number,
    emotional_load: Number,
    sessionType: String,
    feedback: String
})

module.exports = mongoose.model("Usage", usageSchema)
