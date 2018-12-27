const mongoose = require('mongoose');

const validator = require('./validators/index');

const Schema = mongoose.Schema;

//TODO: Start validation with mongoose-validator

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
    cnpj: {
        type: String,
        required: true
    },
    addr: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    account: {
        type: Array
    },
    modified: {
        type: String,
        default: day
    }, 
});


module.exports = mongoose.models.Client || mongoose.model('Client', ClientSchema);