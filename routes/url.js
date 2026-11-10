const express = require('express');
const { getUrl } = require('../controllers/url');

const router = express.Router();

router.post('/', getUrl);

module.exports = router
