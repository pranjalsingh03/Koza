const mongoose = require('mongoose');
const Product = require('./productModel');

const cartSchema = new mongoose.Schema({
  items : [ {
    product :
        {type : mongoose.Schema.Types.ObjectId, ref : Product, required : true},
    quantity : {type : Number, default : 1}
  } ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
