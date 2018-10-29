const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
    },
    street: {
        type: String
    },
    //bairros
    ngh: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    defaulting: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.models.Client || mongoose.model('Client', ClientSchema);