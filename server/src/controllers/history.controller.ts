const Usage = require("../models/Usage");

const getHistory = async (req: any, res: any) => {
    const history = await Usage.find({
        user: req.user.id
    }).sort({ date: 1 });

    res.json(history);
};

module.exports = { getHistory };
