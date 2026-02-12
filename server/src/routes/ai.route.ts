const express = require("express")
const router = express.Router()

const { analyzeEmotion } = require("../controllers/ai.controller")

router.post("/analyze", analyzeEmotion)

module.exports = router
