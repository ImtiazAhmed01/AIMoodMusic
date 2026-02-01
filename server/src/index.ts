const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const aiRoute = require("./routes/ai.route");
const youtubeRoute = require("./routes/youtube.route");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("MongoDB connected"))
    .catch(console.error);

app.use("/api/ai", aiRoute);
app.use("/api/youtube", youtubeRoute);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
