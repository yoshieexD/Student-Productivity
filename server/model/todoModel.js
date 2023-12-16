const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    end_date: {
        type: String,
    },
    type: {
        type: String,
    },
})
const todoModel = mongoose.model('todoModel', todoSchema);
module.exports = todoModel;