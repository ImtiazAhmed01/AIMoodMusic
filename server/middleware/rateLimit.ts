const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 100,
    message: "Daily request limit reached",
    standardHeaders: true,
    legacyHeaders: false,
});

// Switch export to module.exports
module.exports = { apiLimiter };