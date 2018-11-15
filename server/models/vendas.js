const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const sellSchema = new Schema({

    cliente: {
        type: String,
        required: true
    },
    produto: {

        code: {
            type: String
        },
        quantidade: {
            type: Number
        },
        valor: {
            type: Number
        }
    },
    valor: {
        type: Number
    },
    date: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean, 
        default: false
    }

});

module.exports = mongoose.model.sell || mongoose.model('sell', selltSchema)