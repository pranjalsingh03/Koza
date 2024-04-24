const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Blog', blogSchema);