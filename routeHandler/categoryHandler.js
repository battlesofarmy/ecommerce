const express = require('express')
const router = express.Router();
const CategoryModel = require('../schemas/categorySchema');

// Create =============================================
// Get =============================================

// get all
router.get('/', async(req, res)=>{
    try{
        const result = await CategoryModel.find({});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message)
    }
})

// Update =============================================
// Delete =============================================

module.exports = router;