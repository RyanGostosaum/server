const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    dataAniversario: {
        type: Date,
        required: true
    },
    rua: {
        type: String
    },
    bairro: {
        type: String
    },
    cidade: {
        type: String
    }
});
mongoose.model('cliente', clientesSchema)