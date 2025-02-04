const mongoose = require('mongoose');

const cartSchemaModel = mongoose.Schema({

    catId : { type: String, required: true },
    subCatId : { type: String, required: true },
    name : { type: String, required: true },
    img : { type: String, required: true },
    model : { type: String, required: true },
    price : { type: Number, required: true },
    email : { type: String, required: true },
    count : { type: Number, required: true },
    
}, { versionKey : false });

const CartModel = mongoose.model("Cart", cartSchemaModel);
module.exports = CartModel;