const Session = require("../models/Session");

const updateSession = async (req: any, res: any) => {
    const { skips, duration, active } = req.body;

    const session = await Session.create({
        skips,
        duration,
        active,
    });

    res.json(session);
};

module.exports = { updateSession };
