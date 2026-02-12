const express = require("express")
const router = express.Router()

const { searchYoutube } = require("../controllers/youtube.controller")

router.post("/search", searchYoutube)

module.exports = router
