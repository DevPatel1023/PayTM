const Account = require('../models/account.model.js')
const mongoose = require('mongoose')

const getBalance = async(req,res)=>{
    console.log("User ID:", req.id)

    const userId = req.id;
    if(!userId){
        return res.status(400).json({
            msg : "User Id required"
        })
    }
    const account = await Account.findOne({
        userId
    });
    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    console.log(account)
    res.json({
        balance : account.balance
    })
}

const transferMoney = async(req,res) =>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , ReciverId} = req.body;
    console.log(req.id);

    //fetch the accounts within the transaction
    const senderAcc = await Account.findOne({
        userId : req.id
    }).session(session);

    if(!senderAcc || senderAcc.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient balance"
        })
    }
    const reciverAcc = await Account.findOne({
        userId : ReciverId
    });

    if(!reciverAcc){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Invalid Account"
        })
    }

    //perform the transaction 
    await Account.updateOne({
        userId : req.id
    },
    {
        $inc : {balance : -amount}
    }).session(session);
    await Account.updateOne({
        userId : ReciverId
    },
    {
        $inc : {balance : amount}
    }).session(session);

    //commit transaction
    await session.commitTransaction();
    res.json({
        message : 'transfer successful'
    });

}

module.exports = {
    getBalance,
    transferMoney
}