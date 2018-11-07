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

    productModel.findById(req.params.id)
        .then(results => res.json(results))
        .catch(err => res.json({
            message: 'Produto não encontrado',
            status: 400,
            err: err
        }))
}

productController.newProducts = (req, res) => {

    productModel.findOne({
        'code': req.body.code
    })

    .then(product => {

        if(product) {

            res.json({

                success: false, 
                message: 'Produto já foi cadastrado'

            });
        } else {

            var product = new productModel({
                code: req.body.code,
                nome: req.body.code,
                date: req.body.date, 
                preco: req.body.preco, 
                marca: req.body.marca, 
                quantidade: req.body.quantidade, 
                group: req.body.group
            })

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

module.exports = productController;