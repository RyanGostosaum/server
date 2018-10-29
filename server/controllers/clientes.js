
const mongoose = require('mongoose')

const ClientSchema = require('../models/clientes')

const modelUser = mongoose.model('Client');

const Joi = require('joi');


const validatorClient = {
    name: Joi.string().alphanum().min(2).max(35),
    email: Joi.string().email(),
    phone: Joi.string(),
    birth: Joi.number().integer().min(1900).max(2018),
    street: Joi.string(),
    ngh: Joi.string(),
    city: Joi.string()
}

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

                let client = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone
                }

                Joi.validate(client, validatorClient, (err, value) => {

                    console.log(client);

                    if (err) {

                        console.log('Deu rui' + err);

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


module.exports = clientController;

/*
let client = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    birth: req.body.name,
}
*/