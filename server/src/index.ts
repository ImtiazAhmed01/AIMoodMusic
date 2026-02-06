const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;
const youtubeRoutes = require("./routes/youtube.route");

// 👇 MOUNT ROUTE
app.use("/youtube", youtubeRoutes);

// health check
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});
connectDB().then(() => {
    app.listen(PORT, () =>
        console.log(`🚀 Server running on ${PORT}`),
        console.log("ENV CHECK:", process.env.MONGODB_URI)
    );
});
