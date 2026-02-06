require("./config/env");

const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/ai.route");
const youtubeRoutes = require("./routes/youtube.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/youtube", youtubeRoutes);
app.get("/", (req: any, res: { json: (arg0: { status: string; message: string; time: string; }) => void; }) => {
    res.json({
        status: "OK",
        message: "Backend is running",
        time: new Date().toISOString()
    });
});
const testRoute = require("./routes/test.route");
app.use("/test", testRoute);


module.exports = app;
