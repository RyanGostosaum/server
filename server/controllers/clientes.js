const mongoose = require('mongoose')

const ClientSchema = require('../models/clientes')

const modelUser = mongoose.model('Client');

const OrderSchema = require('../models/pedidos');

const orderModel = mongoose.model('Order');

// Lets go
let clientController = {};

clientController.allUsers = (req, res) => {

    console.log('Buscando...');

    modelUser
        .find()
        .then(results => res.json(results))
        .catch(err => res.send(err));
}

clientController.someUsers = (req, res) => {

    modelUser
        .findOne({
            'name': req.query.name
        })
        .then(results => {
            orderModel.find({'client': req.query.name}, (e, orders) => {
                if (e)
                throw e;
                res.json({
                    user: results, 
                    order: orders
                })
            })
        })
        .catch(err => res.json({
            message: 'Cliente não encontrado',
            status: 400
        }));
}

clientController.newUser = (req, res) => {

    console.log(req.body.data[0].about.pictures[0]);
    const about = req.body.data[0]
    const type = req.body.data[1]
    const address = req.body.data[2]
    const trueAddr = [address][0].address.street + ', ' + [address][0].address.number + ', ' + [address][0].address.city + ', ' + [address][0].address.simpleSelect

    var data = [type][0].account
    var account = Object
        .keys(data)
        .filter((key) => {
            return data[key] === true
        })
    // console.log(JSON.stringify([about][0].about.name) + '\n' + type + '\n' +
    // address);
    modelUser
        .findOne({
            'name': [about][0].about.name
        })
        .then(user => {

            if (user) {

                res.json({
                    success: false,
                    message: 'Esse nome já está cadastrado'
                });

            } else {

               

                var client = new modelUser({
                    name: [about][0].about.name,
                    phone: [about][0].about.phone,
                    email: [about][0].about.email,
                    cnpj: [about][0].about.CNPJ,
                    //info
                    addr: trueAddr,
                    //account
                    account: account
                })

                client
                    .save()
                    .then(() => res.json({
                        success: true,
                        message: 'Cliente registrado!',
                        statusCode: 201
                    }), console.log('aaaaa'))
                    .catch(err => res.json({
                        success: false,
                        message: 'Error' + err,
                        statusCode: 500

                    }));
            }

        })
}

clientController.updateUsers = (req, res) => {
    console.log('Buscando o put...');
    console.log(req.body)
    console.log(req.query);

    modelUser.findByIdAndUpdate(req.query.id, req.body, {
        new: true
    }, (err, user) => {

        if (user) {

            res.json({
                message: 'Update feito!',
                data: user,
                statusCode: 201
            })

        } else {

            res.json({
                message: 'Error',
                statusCode: 404
            })
        }
    })

}

clientController.deleteUsers = (req, res) => {

    modelUser.findByIdAndRemove(req.query.id, (err, user) => {

        if (err) {

            res.json({
                message: 'Error',
                statusCode: 400
            })

        } else {

            res.json({
                message: "Cliente deletado",
                data: user._id,
                statusCode: 201
            })
        }
    })

}

// ! Crud básico termina aqui

module.exports = clientController;