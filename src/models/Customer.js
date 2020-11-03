const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('customers', customerSchema);