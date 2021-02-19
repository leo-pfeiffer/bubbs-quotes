const mongoose = require('mongoose');

const quote = new mongoose.Schema({
    quote: {
        type: String
    },
    category: {
        type: String
    }

})

module.exports = Quote = mongoose.model('user', user);