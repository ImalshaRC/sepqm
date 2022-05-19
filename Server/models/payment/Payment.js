const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({

    cardNo: {
        type: String,
        required: true
    },

    amount: {
        type: String,
        required: true
    },

    cvcNo: {
        type: String,
        required: true
    },

    holderName: {
        type: String,
        required: true
    },
    
    verify: {
        type: Boolean,
    },

    token: {
        type: String,
    }

})

const payment = mongoose.model("payment", PaymentSchema);

module.exports = payment;