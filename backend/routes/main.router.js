const express = require('express');
const router = express.Router();
const userRouter = require('./user.route.js')
const accountRouter = require('./account.router.js')

router.use("/user",userRouter);
router.use("/account",accountRouter);

module.exports = router ;