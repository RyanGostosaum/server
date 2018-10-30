const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//TODO: Start validation with mongoose-validator
// ! You also need to finish the products system

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String
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
        type: Boolean
    }
});


module.exports = mongoose.models.Client || mongoose.model('Client', ClientSchema);