const { searchYoutube } = require("../utils/youtube");

const youtubeSearch = async (req: any, res: any) => {
    const { q } = req.query;
    const data = await searchYoutube(q);
    res.json(data);
};

module.exports = { youtubeSearch };
