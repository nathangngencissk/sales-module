const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    serial: {
        type: String,
        require: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
        default: 0
    },
    recommendation: {
        type: Number,
        require: true,
        default: 0
    }
});

module.exports = mongoose.model('products', productSchema);