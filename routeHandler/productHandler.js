const express = require('express');
const router = express.Router();
const ProductModel = require('../schemas/productSchema');

// Get =================================================

// get all
router.get('/', async(req, res)=>{
    try{
        const result = await ProductModel.find({});
        res.status(200).send(result);
    }catch(err){
        res.status(500).send(err.message);
    }
})

// get by category
router.get('/category/:id', async(req, res)=>{
    try{
        const result = await ProductModel.find({"catId" : req.params.id});
        res.status(200).send(result);
        
    }catch(err){
        res.status(500).send(err);
    }
})

// get by subcategory
router.get('/subcategory/:id', async(req, res)=>{
    try{
        const result = await ProductModel.find({"subCatId" : req.params.id});
        res.status(200).send(result);
        
    }catch(err){
        res.status(200).send(result);
    }
})

// get by id 
router.get('/:id', async(req, res)=>{
    try{
        const result = await ProductModel.findById({"_id" : req.params.id});
        res.status(200).send(result);
        
    }catch(err){
        res.status(500).send(err.message);
    }
})

// Create ======================================================
// Update ======================================================

// Delete ======================================================

// delete by subcategory
router.delete('/subcategory/:id', async(req, res)=>{
    try{
        const result = await ProductModel.deleteMany({"subCatId" : req.params.id});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message);
    }
})


module.exports = router;