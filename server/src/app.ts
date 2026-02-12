require("./config/env");

const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/ai.route");
const youtubeRoutes = require("./routes/youtube.route");
const historyRoute = require("./routes/history.route");
const sessionRoute = require("./routes/session.route");
const authRoute = require("./routes/auth.route");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/history", historyRoute);
app.use("/api/session", sessionRoute);
app.use("/api/auth", authRoute);
app.get("/", (req: any, res: { json: (arg0: { status: string; message: string; time: string; }) => void; }) => {
    res.json({
        status: "OK",
        message: "Backend is running",
        time: new Date().toISOString()
    });
});
const testRoute = require("./routes/test.route");
app.use("/test", testRoute);
const healthRoute = require("./routes/health.route");

app.use("/health", healthRoute);
app.use("/ai", aiRoutes);
app.use("/youtube", youtubeRoutes);

module.exports = app;