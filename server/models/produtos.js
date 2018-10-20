import { mongo } from 'mongoose';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const produtosSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    preco: {
        type: Number, 
        default: 0,
    },
    quantidade: {
        type: Number,
        required: true
    },
    marca: {
        type: String
    }
});
mongoose.model('produtos', produtosSchema)