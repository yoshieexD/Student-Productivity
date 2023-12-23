const mongoose = require('mongoose');
const linkSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String,
    },
    link: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    }
})
const linkModel = mongoose.model('linkModel', linkSchema);
module.exports = linkModel;