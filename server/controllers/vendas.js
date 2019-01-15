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

    var client = req.body.client
    var product = req.body.products
    var pagamento = req.body.pagamento
    var total = req.body.total
    var quant = req.body.sellQuant
    var value = product.price / product.quantReq

    if (req.body) {
        //todo 
        var sell = new sellModel({
            cliente: {
                name: client.name,
                phone: client.phone,
                id: client._id
            },
            produto: product,
            valor: total,
            pagamento: {
                mode: pagamento
            }

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
    } else {
        res.json({
            success: false,
            message: 'Nenhum dado fornecido'
        })

    }

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

    sellModel.count({
        'state': 'open'
    }, (err, count) => {
        if (!err) {
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
sellController.countDataSells = (req, res) => {

    console.log(req.query)

    if (req.query.type === 'month') {
        console.log('Type is month');
        sellModel.count({
            'date.month': req.query.data
        }, (err, count) => {
            if (!err) {
                res.json({
                    count: count,
                    success: true,
                    type: 'month'
                })
            } else {
                res.json({
                    err: err,
                    success: false
                })
            }
        })
    }
    if (req.query.type === 'day') {

        console.log('Type is Day');
        sellModel.count({
            'date.day': req.query.data
        }, (err, count) => {
            if (!err) {
                res.json({
                    count: count,
                    success: true,
                    type: 'day'
                })
            } else {
                res.json({
                    err: err,
                    success: false
                })
            }
        })

    }

}
sellController.findSellsByDate = (req, res) => {

    console.log(req.query)

    if (req.query.type === 'day') {

        console.log('Type is Day');

        sellModel.find({
                'date.day': req.query.data
            })
            .then((result) => {
                const value = result
                console.log(result)

                res.json({
                    value: result.valor,
                    success: true,
                    type: 'day'
                })
            }).catch((err) => {
                    console.log(err);
                }

            );

    }
    if (req.query.type === 'month') {

        console.log('Type is Month');

        sellModel.find({
                'date.month': req.query.data
            })
            .then((result) => {

                console.log(result)

                res.json({
                    value: result.valor,
                    state: result.state,
                    success: true,
                    type: 'day'
                })
            }).catch((err) => {
                    console.log(err);
                }

            );

    }

}

module.exports = sellController;