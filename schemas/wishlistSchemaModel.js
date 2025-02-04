const mongoose = require('mongoose');

const wishlistSchemaModel = mongoose.Schema({

    email : { type: String, required: true },
    products : { type: Array },
    
}, { versionKey : false });

const WishListModel = mongoose.model("Wishlist", wishlistSchemaModel);
module.exports = WishListModel;