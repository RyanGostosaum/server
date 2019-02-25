const mongoose = require('mongoose');

const OrderSchema = require('../models/pedidos');

const orderModel = mongoose.model('Order');

let orderController = {}

orderController.allOrders = (req, res) => {

    orderModel.find()
        .then(results => res.json({
            results
        }))
        .catch(err => res.json(err));
}

orderController.someOrders = (req, res) => {

    orderModel.findById(req.query.id)
        .then(results => {
            res.json(results)
        })
        .catch(err => res.json({
            message: 'Chamado não encontrado',
            status: 400,
            err: err
        }))
}

orderController.newOrders = (req, res) => {
    var order = new orderModel({
        clientId: req.body.client._id,
        client: req.body.client.name,
        prevent: req.body.prevent,
        aval: req.body.obs,
        info: req.body.info,
        date: new Date,
        author: req.userData.username
    })

    order.save()

        .then(() => res.json({
            success: true,
            message: 'Chamado registrado',
            status: 201
        }))

        .catch(err => res.json({
            success: false,
            message: err,
            status: 500
        }))
}
orderController.updateOrders = (req, res) => {
    orderModel.findByIdAndUpdate(
        req.query.id, {
            status: 'finalizado'
        }, (err, order) => {

            if (order) {

                res.json({

                    message: 'Update feito!',
                    date: order,
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

orderController.deleteOrders = (req, res) => {

    orderModel.findByIdAndRemove(req.query.id, (err, order) => {

        if (err) {

            res.json({
                message: 'Error',
                status: 400
            })

        } else {
            res.json({
                message: 'Chamado deletado',
                data: order,
                status: 201
            })
        }

    })

}

module.exports = orderController;