const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    paymentID: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: false }
})

module.exports = mongoose.model('Payment', paymentSchema);