const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    console.warn('request auth');
    next();
})

module.exports = router;
