const express = require("express")
const { getBalance,transferMoney } = require( "../controller/account.controller.js")
const authenticationToken  = require("../middleware/auth.middleware.js")
const router = express.Router()

router.get('/getBalance',authenticationToken,getBalance)
router.post('/transferMoney',authenticationToken,transferMoney)

module.exports= router;