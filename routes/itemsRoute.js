const express = require('express');
const ItemModel = require('../models/itemsModel')
const router = express.Router()

router.get("/get-all-items" , async(req,res)=>{
    try{
        const items = await ItemModel.find()
        res.send(items)
    }
    catch(error){
        res.status(400).json(error)
    }
});


router.post("/add-item" , async(req,res)=>{
    try{
        const newitem = new ItemModel(req.body)
        await newitem.save()
        res.send('Item Added Successfully')
    }
    catch(error){
        res.status(400).json(error)
    }
});

router.post("/edit-item" , async(req,res)=>{
    try{
        await ItemModel.findByIdAndUpdate({_id:req.body.ItemId }, req.body)
        res.send('Item Updated Successfully')
    }
    catch(error){
        res.status(400).json(error)
    }
});


router.post("/delete-item" , async(req,res)=>{
    try{
        await ItemModel.findOneAndDelete({_id:req.body.ItemId})
        res.send('Item Deleted Successfully')
    }
    catch(error){
        res.status(400).json(error)
    }
});


module.exports = router