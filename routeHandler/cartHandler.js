const express = require('express');
const router = express.Router();
const CartModel = require('../schemas/cartSchemaModel');

// Create ============================================

// create or update item count 
router.post('/add', async(req, res)=>{
    try{
        const { _id, email} = req.body;
        const result = await CartModel.findById({"_id" : _id, "email" : email});

        if(!result){
            // insert
            const insertCart = await CartModel(req.body).save();
            res.status(200).send(insertCart);
            
        }else{
            // update the count
            const updateItem = await CartModel.findOneAndUpdate(
                {email : email, _id : _id},
                {$inc : {count : 1}},
                {new : true}
            );
            res.status(201).send(updateItem);
        }
    }catch(err){
        res.status(500).send(err.message);
    }
});

// Decrease or removed item
router.post('/remove', async(req, res)=>{
    try{
        const {_id, email} = req.body;
        const result = await CartModel.find({_id: _id, email : email});

        if(result[0].count>1){
            // decrease count
            const updateItem = await CartModel.findOneAndUpdate(
                {_id: _id, email: email},
                {$inc : {count : -1}},
                {new: true}
            );
            res.status(200).send(updateItem);
        }else{
            // removed cart item
            const deletItem = await CartModel.deleteOne({_id: _id});
            res.status(200).send(deletItem);
        }
        
    }catch(err){
        res.status(500).send(err.message);
    }
})



// Get ============================================

// get by email
router.get('/:em', async(req, res)=>{
    console.log("johf tmi koi jan")
    try{
        const result = await CartModel.find({"email" : req.user.email});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message);
    }
})


// Delte ============================================

// delete all
router.delete('/all', async(req, res)=>{
    try{
        const result = await CartModel.deleteMany({});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message);
    }
})

// delete by id
router.delete('/delete/:id', async(req, res)=>{
    try{
        const _id = req.params.id;
        const result =  await CartModel.deleteOne({_id: _id});
        res.status(200).send(result);

    }catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;