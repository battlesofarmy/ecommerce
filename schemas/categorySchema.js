const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    id : { type: String, required: true },
    name : { type: String, required: true },
    img : { type: String, required: true },
}, {versionKey: false});

const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = CategoryModel;