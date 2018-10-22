const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const clientesSchema = new Schema({
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
        required: true
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

mongoose.model('cliente', clientesSchema)