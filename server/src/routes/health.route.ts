const express = require("express");
const router = express.Router();

router.get("/", (req: any, res: { json: (arg0: { status: string; time: Date; }) => void; }) => {
    res.json({
        status: "OK",
        time: new Date(),
    });
});

module.exports = router;
