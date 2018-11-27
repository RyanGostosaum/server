const mongoose = require('mongoose');

const validator = require('./validators/index');

const Schema = mongoose.Schema;

//TODO: Start validation with mongoose-validator
// ! You also need to finish the products system

const time = new Date
const day = time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: validator
    },
    email: {
        type: String
    },
    birth: {
        type: String,
    },
    addr: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    defaulting: {
        type: Boolean
    },
    modified: {
        type: String,
        default: day
    }
});


module.exports = mongoose.models.Client || mongoose.model('Client', ClientSchema);