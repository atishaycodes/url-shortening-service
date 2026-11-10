const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function getUrl(req, res) {
    const body = req.body || {};
    const originalUrl = body.originalUrl || body.url;
    if (!originalUrl) {
        return res.status(400).json({ error: 'originalUrl is required' });
    }
    const shortUrl = nanoid(8);
    await URL.create({
        shortUrl: shortUrl,
        originalUrl: originalUrl,
        visitHistory: [],


    });
    return res.render('home', {
        id: shortUrl
    })
}

module.exports = { getUrl };
