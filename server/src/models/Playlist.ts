const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    userId: String,
    mood: String,
    language: String,
    tracks: [{ title: String, videoId: String }]
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
