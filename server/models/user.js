const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailValidator = require('./validators/email'); 

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        validate: emailValidator
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);