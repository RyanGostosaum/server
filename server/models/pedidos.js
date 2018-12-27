const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const time = new Date
const day = time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()

const OrderSchema = new Schema({
    client: {
        type: String,
        required: true,
    },
    clientID: {
        type: String
    }, 
    dataRegistro: {
        type: String,
        default: day
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