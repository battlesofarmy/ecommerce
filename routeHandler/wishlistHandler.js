const express = require('express');
const router = express.Router();
const WishListModel = require('../schemas/wishlistSchemaModel');


// Create ===================================================

// add 
router.post('/:em', async(req, res)=>{
    try{
        const {_id} = req.body;
        const result = await WishListModel.find({"email" : req.params.em});
        const hasProductItem = await result[0].products.find((ele)=> ele._id === _id);

        if(hasProductItem){
            // removed 
            const value = await WishListModel.updateOne(
                {email : req.params.em},
                { $pull: { products: { _id: req.body._id } }},
                {upsert : true}
            );
            res.status(201).send(value);

        }else{
            // push
            const value = await WishListModel.updateOne(
                {email : req.params.em},
                {$push: {products : req.body}},
                {upsert : true}
            );
            res.status(200).send(value);
        }


    }catch(err){
        res.status(500).send(err.message);
    }
});


// Get ===================================================

// Get all
router.get('/', async(req, res)=>{
    try{
        const result = await WishListModel.find({});
        res.status(200).send(result);

    }catch(err){
        res.status(200).send(err.message);
    }
});

// Get by email
router.get('/:em', async(req, res)=>{
    try{
        const result = await WishListModel.find({email : req.params.em});
        res.status(200).send(result);

    }catch(err){
        res.status(200).send(err.message);
    }
});



// Update ===================================================
// Delete ===================================================

// removed by id
// router.delete('/remove/:id', async(req, res)=>{
//     try{
//         const {_id} = req.body;
//         const result = await WishListModel.find({_id : _id});
//         if(result){
//             // delete
//         }else{

//         }
//         res.status(200).send(result);

//     }catch(err){
//         res.status(200).send(err.message);
//     }
// });

module.exports = router;