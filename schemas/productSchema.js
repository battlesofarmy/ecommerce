const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    catId : { type: String, required: true },
    subCatId : { type: String, required: true },
    name : { type: String, required: true },
    img : { type: String, required: true },
    model : { type: String, required: true },
    price : { type: Number, required: true },
    
}, { versionKey : false });

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;