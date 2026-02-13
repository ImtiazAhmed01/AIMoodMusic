const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },

    profile: {
        primaryMood: { type: String, default: "" },
        preferredStyle: { type: String, default: "" },
        avgStress: { type: Number, default: 0 },
        avgEnergy: { type: Number, default: 0 },
        bestSessionLength: { type: Number, default: 20 }
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);
