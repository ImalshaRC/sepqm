const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    cast: {
        type: String,
        required: true
    },

    showTime: {
        type: String,
        required: true
    }

})

const movie = mongoose.model("movie", MovieSchema);

module.exports = movie;