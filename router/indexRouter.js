const express = require('express');
const appRouter = require('./appRouter');
const authRouter = require('./authRouter');

const router = express.Router();

router.use(appRouter);
router.use(authRouter);

module.exports = router;
