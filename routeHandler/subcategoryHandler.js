const express = require('express');
const router = express.Router();
const SubCategoryModel = require('../schemas/subcategorySchema');

// Creat ==============================================
// Get ==============================================

// get all
router.get('/', async(req, res)=>{
    try{
        const result = await SubCategoryModel.find({});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message);
    }
});

// get by category
router.get('/category/:id', async(req, res)=>{
    try{
        const result = await SubCategoryModel.find({"catId" : req.params.id});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message);
    }
})

// Update ==============================================
// Delete ==============================================


module.exports = router;