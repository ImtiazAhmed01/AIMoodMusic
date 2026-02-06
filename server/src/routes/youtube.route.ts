const express = require("express");
const { youtubeSearch } = require("../controllers/youtube.controller");

const router = express.Router();
router.get("/search", youtubeSearch);

module.exports = router;
