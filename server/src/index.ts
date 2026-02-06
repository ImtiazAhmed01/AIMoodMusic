const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () =>
        console.log(`🚀 Server running on ${PORT}`),
        console.log("ENV CHECK:", process.env.MONGODB_URI)
    );
});
