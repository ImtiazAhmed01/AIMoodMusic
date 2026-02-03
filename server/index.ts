require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const aiRoute = require("./routes/ai.route");
const youtubeRoute = require("./routes/youtube.route");
const playlistRoute = require("./routes/playlist.route");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(console.error);

app.use("/api/ai", aiRoute);
app.use("/api/youtube", youtubeRoute);
app.use("/api/playlists", playlistRoute);

app.get("/", (_: any, res: { send: (arg0: string) => void; }) => {
    res.send("🎧 AI Mood Music Backend Running");
});

app.listen(process.env.PORT || 5000, () =>
    console.log("🚀 Server running")
);
