const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
    }],
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel',
            required: true,
        },
        content: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
})

const chatModel = mongoose.model('chatModel', chatSchema);
module.exports = chatModel;