const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String
    },

    password: {
        type: String
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);