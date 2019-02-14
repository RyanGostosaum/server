const mongoose = require("mongoose");

const moment = require("moment");

var fullDate = moment().format("DD/MM/YY");

const caixaSchema = require("../models/caixa")

const caixaModel = mongoose.model("caixa");

let caixaController = {};

caixaController.daily = (req, res) => {

    if(req.query.length > 0){
        const date = req.query.date
        var fullDate = date.replace("20", '')
    } else {
        var fullDate = moment().format("DD/MM/YY");
    }
    console.log(fullDate);
    caixaModel.find({
        'date': fullDate
    }).then(results => {
        console.log(results);
        res.json(results)
    }).catch(e => {
        res.json({
            message: 'err', 
            e
        })
    })
}

caixaController.newCaixa = (req, res) => {

    console.log(req.body);
    
    var caixa = new caixaModel({
        value: req.body.caixa
    })

    caixa.save()
    .then(() => res.json({
        message: 'Caixa registrado'
    }))
    .catch(e => {
        res.json(e)
    })
}
module.exports = caixaController;