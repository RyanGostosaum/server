const mongoose = require('mongoose');

const nameValidator = require('./validators/name.js');
const emailValidator = require('./validators/email.js');

const Schema = mongoose.Schema;

//TODO: Start validation with mongoose-validator

const moment = require('moment')

var day = moment().format("DD/MM/YY")

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: nameValidator
    },
    email: {
        type: String,
        validate: emailValidator
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