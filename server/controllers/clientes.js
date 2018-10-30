const mongoose = require('mongoose')

const ClientSchema = require('../models/clientes')

const modelUser = mongoose.model('Client');

let clientController = {};

clientController.allUsers = (req, res) => {

    console.log('Buscando...');

    modelUser.find()
        .then(results => res.json(results))
        .catch(err => res.send(err));
}


clientController.newUser = (req, res) => {

    console.log('ok!');

    modelUser.findOne({
            'name': req.body.name
        })
        .then(user => {

            if (user) {

                res.json({

                    success: false,
                    message: 'Esse nome já está cadastrado'

                });

            } else {

                var client = new modelUser({
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email
                })

                console.log(JSON.stringify(client) + ' São os inputs');
                // Joi.validate(client, validatorClient, (err, value) => {



                client.save()

                    .then(() => res.json({
                        success: true,
                        message: 'Cliente registrado!',
                        statusCode: 201
                    }))

                    .catch(err => res.json({
                        success: false,
                        message: err,
                        statusCode: 500

                    }));
            }

            //      })


        })
}


module.exports = clientController;

/*
let client = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    birth: req.body.name,
}
*/