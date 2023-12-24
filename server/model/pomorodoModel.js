const mongoose = require('mongoose');
const pomorodoSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    minutes: {
        type: String
    },
    date: {
        type: String
    },
    history: {
        type: String,
    },
    points: {
        type: String,
    }
})
const pomorodoModel = mongoose.model('pomorodoModel', pomorodoSchema);
module.exports = pomorodoModel;