const mongoose = require('mongoose');

const OrderSchema = require('../models/pedidos');

const orderModel = mongoose.model('Order');

let orderController = {}

orderController.allOrders = (req, res) => {

    orderModel.find()
        .then(results => res.json({
            data: results
        }))
        .catch(err => res.json(err));

}

orderController.countOrders = (req, res) => {

    orderModel.count({}, (err, count) => {
        res.json({
            orders: count, 
            success: true
        })
    })
}
orderController.countOpenOrders = (req, res) => {

    orderModel.where({'status': 'aberto'}).countDocuments((err, count) => {
        if(err) {
            res.json({
                err: err, 
                success: false
            })
        } else {
            res.json({
                count: count, 
                success: true
            })
        }
    })
}
orderController.countCloseOrders = (req, res) => {

    orderModel.where({'status': 'finalizado'}).countDocuments((err, count) => {
        if(err) {
            res.json({
                err: err, 
                success: false
            })
        } else {
            res.json({
                count: count, 
                success: true
            })
        }
    })
}
orderController.someOrders = (req, res) => {

    orderModel.findById(req.params.id)
        .then(results => res.json(results))
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
        //pagamento:
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

    console.log(req.body.quantidade);

    orderModel.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
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

    orderModel.findByIdAndRemove(req.params.id, (err, order) => {

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