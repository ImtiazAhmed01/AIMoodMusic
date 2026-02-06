const express = require("express");
const Test = require("../models/Test");

const router = express.Router();

router.post("/insert", async (_req: any, res: { json: (arg0: any) => void; }) => {
    const doc = await Test.create({ name: "Hello DB" });
    res.json(doc);
});

router.get("/all", async (req: any, res: { json: (arg0: any) => void; }) => {
    const docs = await Test.find();
    res.json(docs);
});

module.exports = router;
