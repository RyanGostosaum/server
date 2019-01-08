const mongoose = require('mongoose');

const sellSchema = require('../models/vendas');

const sellModel = mongoose.model('sell');

let sellController = {}

sellController.allSells = (req, res) => {

    sellModel.find()
        .then(results => res.json(results))
        .catch(err => res.json(err));

}

sellController.someSells = (req, res) => {

    sellModel.findById(req.query.cod)
        .then(results => res.json(results))
        .catch(err => res.json({
            message: 'Venda nao encontrada',
            status: 400,
            err: err
        }))

}

sellController.newSells = (req, res) => {

    console.log(req.body)
    sellModel.findById(req.body.cod)

        .then(sell => {

            if (sell) {

                res.json({

                    success: false,
                    message: 'Essa venda ja foi realizada, algo de errado aconteceu',
                    status: 400

                });

            } else {
                //todo 
                var sell = new sellModel({
                    code: req.body.cod,
                    desc: req.body.desc,
                    price: req.body.price,
                    quant: req.body.quant
                })

                console.log(sell);

                sell.save()

                    .then(() => res.json({
                        success: true,
                        message: 'Produto registrado',
                        status: 201
                    }))

                    .catch(err => res.json({
                        success: false,
                        message: err,
                        status: 500
                    }))
            }
        })
}

sellController.updateSells = (req, res) => {

    console.log(req.body.quant);

    sellModel.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        }, (err, sell) => {

            if (sell) {

                res.json({

                    message: 'Update feito!',
                    date: sell,
                    status: 201
                })

            } else {
                res.json({
                    message: 'Error',
                    status: 404
                })
            }
        }
    )
}

sellController.deleteSells = (req, res) => {

    sellModel.findByIdAndRemove(req.params.id, (err, sell) => {

        if (err) {

            res.json({
                message: 'Error',
                status: 400
            })

        } else {
            res.json({
                message: 'Produto deletado',
                data: sell,
                status: 201
            })
        }

    })

}

sellController.countOpenSells = (req, res) => {

    sellModel.count({'state': 'open'}, (err, count) => {
        if(!err) {
            res.json({
                count: count, 
                success: true
            })
        } else {
            res.json({
                err: err,
                success: false
            })
        }
    })
        
}

module.exports = sellController;