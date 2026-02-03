const { Router } = require("express");
const { searchYoutube } = require("../controllers/youtube.controller");

const router = Router();
router.get("/", searchYoutube);

module.exports = router;
