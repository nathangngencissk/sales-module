const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    date: {
        type: Date,
        default: Date.now
    },
    document: {
        type: Schema.Types.ObjectId,
        ref: "Document"
    }
});

module.exports = mongoose.model('orders', orderSchema);