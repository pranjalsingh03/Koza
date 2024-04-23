const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    price: Number,
    discount: Number,
    category: String,
    description: String,
});

module.exports = mongoose.model('Product', productSchema);