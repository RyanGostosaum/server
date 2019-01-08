const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const moment = require('moment')

var day = moment().format("DD/MM/YY")

const ProductSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: day
    },
    price: {
        type: Number, 
        default: 0.00,
    },
    quant: {
        type: Number,
    }
});


module.exports = mongoose.model.Product || mongoose.model('Product', ProductSchema)