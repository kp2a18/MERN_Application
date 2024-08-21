const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },

    coins: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('order', OrderSchema)