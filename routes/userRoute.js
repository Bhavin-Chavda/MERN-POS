const express = require('express');
const UserModel = require('../models/userModel')
const router = express.Router()


router.post("/login" , async(req,res)=>{
    try{
        const user = await UserModel.findOne({userID : req.body.userID , password:req.body.password , verified:true})
        if(user)
        res.send(user)
        else
        res.status(400).json({message:'Login Failed'})
    }
    catch(error){
        res.status(400).json(error)
    }
});

router.post("/register" , async(req,res)=>{
    try{
        const newuser = new UserModel({...req.body , verified:true});
        await newuser.save()
        res.send('User Registered Successfully')
    }
    catch(error){
        res.status(400).json(error)
    }
});


module.exports = router