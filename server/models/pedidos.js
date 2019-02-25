const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema;

const day = moment().format("DD/MM/YY")

const month = moment().format('MMM')

const today = new Date()

const OrderSchema = new Schema({
    client: {
        type: String,
        required: true,
    },
    clientId: {
        type: String
    }, 
    lastSeen: {
        type: String,
        default: day, 
        unique: true
    },
    month: {
        type: String, 
        default: month
    },
    prevent: {
        type: Boolean
    },
    equip: [{
        equipamento: String,
    }],
    aval: {
        type: String
    },
    peças: [{
        nome: {
            type: String
        },
    }], 
    status: {
        type: String, 
        default: 'aberto'
    }, 
    finalDate: {
        type: String
    }, 
    info: {
        type: String, 
        default: "Nada adicionado"
    },
    date: {
        type: Date,
    }, 
    author: {
        type: String
    }
});

module.exports = mongoose.model.Order || mongoose.model('Order', OrderSchema)