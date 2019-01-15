const mongoose = require('mongoose');

const ProductSchema = require('../models/produtos');

const productModel = mongoose.model('Product');

let productController = {}

productController.allProducts = (req, res) => {

    productModel.find()
        .then(results => res.json(results))
        .catch(err => res.json(err));

}

productController.someProducts = (req, res) => {

    console.log(req.query)
    productModel.findOne({
            'code': req.query.code
        })
        .then(results => {
            console.log(results)
            res.json({
                success: true,
                results
            })
        })
        .catch(err => res.json({
            message: 'Produto não encontrado',
            status: 400,
            err: err
        }))

}

productController.sellProducts = (req, res) => {

    console.log(req.query)

    productModel.findOne({
            'code': req.query.code
        })
        .then(results => {
            console.log(results)
            const price = req.query.quant * results.price
            if(req.query.quant > results.quant) {
                res.json({
                    success: true,
                    date: results.date,
                    price: price,
                    quantReq: req.query.quant,
                    initialPrice: results.price,
                    id: results.id,
                    code: results.code,
                    desc: results.desc,
                    message: "Quantidade requisitada é maior que o estoque..."
                })
            }
            res.json({
                success: true,
                date: results.date,
                price: price,
                id: results.id,
                initialPrice: results.price,
                code: results.code,
                desc: results.desc,
                quantReq: req.query.quant
            })
        })
        .catch(err => res.json({
            message: 'Produto não encontrado',
            status: 400,
            err: err
        }))

}

productController.newProducts = (req, res) => {

    productModel.findOne({
            'code': req.body.cod
        })

        .then(product => {

            if (product) {

                res.json({

                    success: false,
                    message: 'Produto já foi cadastrado',
                    status: 400
                });
            } else {

                var product = new productModel({
                    code: req.body.cod,
                    desc: req.body.desc,
                    price: req.body.price,
                    quant: req.body.quant

                })
                console.log(product);

                product.save()

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

productController.updateProducts = (req, res) => {

    console.log(req.body.quantidade);

    productModel.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        }, (err, product) => {

            if (product) {

                res.json({

                    message: 'Update feito!',
                    date: product,
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

productController.deleteProducts = (req, res) => {

    productModel.findByIdAndRemove(req.params.id, (err, product) => {

        if (err) {

            res.json({
                message: 'Error',
                status: 400
            })

        } else {
            res.json({
                message: 'Produto deletado',
                data: product,
                status: 201
            })
        }

    })

}

productController.countProducts = (req, res) => {

    productModel.count({}, (err, count) => {
        if (!err) {
            res.json({
                count: count,
                success: true
            })
        } else {
            res.json({
                err: err
            })
        }
    })
}

module.exports = productController;