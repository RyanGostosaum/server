const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    preco: {
        type: Number, 
        default: 0,
    },
    quantidade: {
        type: Number,
    },
    marca: {
        type: String
    },

    group: {
        type: String,
        default: 'Não definido'
    }
});

module.exports = mongoose.model.Product || mongoose.model('Product', ProductSchema)