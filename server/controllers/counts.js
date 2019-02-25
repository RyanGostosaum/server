const mongoose = require('mongoose')
const ClientSchema = require('../models/clientes')
const modelUser = mongoose.model('Client');
const OrderSchema = require('../models/pedidos');
const orderModel = mongoose.model('Order');

let countController = {}

countController.countAll = (req, res) => {
    modelUser.count({}, (err, users) => {
        if (err)
            throw err;
        orderModel
            .where({
                'status': 'aberto'
            })
            .countDocuments((err, openOrders) => {
                if (err)
                    throw err;
                orderModel
                    .where({
                        'status': 'finalizado'
                    })
                    .countDocuments((err, closedOrders) => {
                        if (err)
                            throw err;
                        orderModel.count({}, (err, orders) => {
                            if (err)
                                throw err;
                            res.json({
                                users: users,
                                orders: orders,
                                openOrders: openOrders,
                                closedOrders: closedOrders
                            })
                        })
                    })
            })
    }).catch(e => {console.log(e);})
}

module.exports = countController;