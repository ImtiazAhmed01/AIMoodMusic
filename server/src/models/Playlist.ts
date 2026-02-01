const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    userId: String,
    name: String,
    language: String,
    mood: String,
    tracks: [
        {
            title: String,
            videoId: String,
        }
    ]
});

module.exports = mongoose.model("Playlist", PlaylistSchema);