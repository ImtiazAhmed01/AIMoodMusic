const express = require("express");
const { updateSession } = require("../controllers/session.controller");

const router = express.Router();
router.post("/update", updateSession);

module.exports = router;
