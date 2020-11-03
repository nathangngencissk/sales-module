const mongoose = require('mongoose');
const { Schema } = mongoose;

const shopSchema = new Schema({
    name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('shops', shopSchema);