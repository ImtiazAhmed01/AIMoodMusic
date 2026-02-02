const express = require("express");
// Destructure your local requires
const { analyzeMood } = require("../controllers/ai.controller");
const { apiLimiter } = require("../middleware/rateLimit");

const router = express.Router();

router.post("/", apiLimiter, analyzeMood);

// Switch export default to module.exports
module.exports = router;