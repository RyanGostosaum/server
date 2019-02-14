const mongoose = require('mongoose')
const moment = require('moment');
const Schema = mongoose.Schema;

moment.locale("pt-br")

var fullDate = moment().format("DD/MM/YY"); 

const caixaSchema = new Schema({
    value: {
        type: Number, 
        default: 0.00
    }, 
    date: {
        type: String, 
        default: fullDate,
        index: {
            unique: true
        }
    }
});

module.exports = mongoose.model.caixa || mongoose.model('caixa', caixaSchema)