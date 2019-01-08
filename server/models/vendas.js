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
        day: {
            type: Date, 
            default: day
        },
        month: {
            type: Date, 
            default: month
        },
        year: {
            type: Date, 
            default: year
        },
        fullDate: {
            type: Date, 
            default: fullDate
        }
    },
    state: {
        type: String,
        default: 'open'
    }

});

module.exports = mongoose.model.sell || mongoose.model('sell', sellSchema)