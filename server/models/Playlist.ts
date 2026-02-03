const mongoose = require("mongoose");
const { Schema } = mongoose;

// Types are fine to keep as 'export' because TS erases them during compilation
export interface ITrack {
    title: string;
    videoId: string;
}

export interface IPlaylist extends import("mongoose").Document {
    userId: string;
    name: string;
    language: string;
    mood: string;
    tracks: ITrack[];
}

const PlaylistSchema = new Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        language: { type: String },
        mood: { type: String },
        tracks: [
            {
                title: String,
                videoId: String,
            },
        ],
    },
    { timestamps: true }
);

// Use module.exports for the actual JavaScript runtime object
module.exports = mongoose.model("Playlist", PlaylistSchema);