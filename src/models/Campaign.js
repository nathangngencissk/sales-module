const mongoose = require('mongoose');
const { Schema } = mongoose;

const campaignSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    name: {
        type: Boolean,
        require: true,
        default: false
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
});

module.exports = mongoose.model('campaigns', campaignSchema);