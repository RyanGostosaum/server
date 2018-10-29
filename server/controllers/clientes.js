const mongoose = require('mongoose')

const ClientSchema = require('../models/clientes')

const modelUser = mongoose.model('Client');

const validatorClient = require('../routes/validators/index');

const Joi = require('joi');

let clientController = {};

clientController.allUsers = (req, res) => {

    modelUser.find()
        .then(results => res.json(results), console.log(results))
        .catch(err => res.send(err));
}


clientController.newUser = (req, res) => {

    if (req.body.name && req.body.email) {

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

                    let client = {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        birth: req.body.name,
                    }

                    Joi.validate(client, validatorClient, (err, value) => {

                        if (err) {

                            res.status(422).json({
                                success: false,
                                message: 'Invalid request data',
                                data: data
                            });

                        } else {

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

                    })


                }

            })
    }

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