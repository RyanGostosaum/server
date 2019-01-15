const mongoose = require('mongoose')
const moment = require('moment');
const Schema = mongoose.Schema;

moment.locale("pt-br")

var day = moment().format('dddd')
var month = moment().format('MMM')
var year = moment().format(`YYYY`)

var fullDate = moment().format("DD/MM/YY")
const sellSchema = new Schema({

    cliente: {
        name: {
            type: String
        },
        phone: {
            type: String
        }, 
        id: {
            type: String
        }
    },
    produto: [{
        code: {
            type: String
        },
        valor: {
            type: Number
        },
        desc: {
            type: String
        }
    }],
    date: {
        day: {
            type: String,
            default: day
        },
        month: {
            type: String,
            default: month
        },
        year: {
            type: Date,
            default: year
        },
        fullDate: {
            type: String,
            default: fullDate
        }
    },
    state: {
        type: String,
        default: 'open'
    },
    valor: {
        type: Number
    },
    pagamento: {
        mode: {
            type: String
        },
        parcelas: {
            type: Number,
            default: 1
        },
        date: {
            type: String, 
            default: fullDate
        }
    }
});

module.exports = mongoose.model.sell || mongoose.model('sell', sellSchema)