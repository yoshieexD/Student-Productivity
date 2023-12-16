const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    code: {
        used: {
            type: Boolean,
            default: false,
        },
        timer: {
            type: Date,
            default: null,
        },
        code: {
            type: String,
        }
    }
})
const userModel = mongoose.model('userModel', userSchema)
module.exports = userModel;
