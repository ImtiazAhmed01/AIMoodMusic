const express = require("express");
const { generateMusic } = require("../controllers/ai.controller");
const { aiLimiter } = require("../middleware/rateLimit");

const router = express.Router();

router.post("/music", aiLimiter, generateMusic);

module.exports = router;
