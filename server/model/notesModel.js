const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
    },
    date: {
        type: String,
    },
    description: {
        type: String,
    }
})

const notesModel = mongoose.model('notesModel', notesSchema);
module.exports = notesModel;