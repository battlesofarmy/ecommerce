const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    catId : { type: String, required: true },
    subCatId : { type: String, required: true },
    name : { type: String, required: true },
    img : { type: String, required: true },
}, { versionKey : false });

const SubCatoryModel = mongoose.model("Subcategory", subCategorySchema);
module.exports = SubCatoryModel;