const mongoose = require("mongoose");

const UsageSchema = new mongoose.Schema({
    userId: String,
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model("Usage", UsageSchema);
