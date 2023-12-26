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
    },
    avatar: {
        type: String,
        default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    gender: {
        type: String,
        default: 'male'
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }]
})
const userModel = mongoose.model('userModel', userSchema)
module.exports = userModel;
