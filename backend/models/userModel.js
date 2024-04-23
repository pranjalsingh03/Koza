const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./productModel");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  cart: [{ type: Schema.Types.ObjectId, ref: Product }],
});

module.exports = mongoose.model("User", userSchema);
