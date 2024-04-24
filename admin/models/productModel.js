const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    discount: Number,
    description: String,
    category: String
});

module.exports = mongoose.model('Product', productSchema);