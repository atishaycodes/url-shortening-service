const express = require('express');

const router = express.Router();

router.get('/display', (req, res) => {
    res.render('home')
});

module.exports = router