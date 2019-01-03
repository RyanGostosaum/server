const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema;

const day = moment("DD-MM-YYYY")

const month = moment('MMM')
const OrderSchema = new Schema({
    client: {
        type: String,
        required: true,
    },
    clientID: {
        type: String
    }, 
    dataRegistro: {
        type: Date,
        default: day
    },
    month: {
        type: Date, 
        default: month
    },
    prevent: {
        type: Boolean
    },
    equip: [{
        equipamento: String,
        serie: String
    }],
    aval: {
        type: String
    },
    peças: [{
        cod: {
            type: String
        },
        nome: {
            type: String
        },
        quant: {
            type: Number
        }
    }], 
    status: {
        type: String, 
        default: 'aberto'
    }
});

module.exports = mongoose.model.Order || mongoose.model('Order', OrderSchema)