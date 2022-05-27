const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    
    showTime: {
        type: String,
        required: true
    },
    
    theatre: {
        type: String,
        required: true
    }
    

})

const cart = mongoose.model("cart", CartSchema);

module.exports = cart;