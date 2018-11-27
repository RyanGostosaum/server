const mongoose = require('mongoose')

const ClientSchema = require('../models/clientes')

const modelUser = mongoose.model('Client');

/*
    Crud começa aqui, os controllers definem as ações de cada rota
*/

let clientController = {};

clientController.allUsers = (req, res) => {

    console.log('Buscando...');

    modelUser.find()
        .then(results => res.json(results))
        .catch(err => res.send(err));
}

clientController.someUsers = (req, res) => {

    console.log('Buscando...' + req.params);

    modelUser.findById(req.params.id)
        .then(results => res.json(results))
        .catch(err => res.json({
            message: 'Cliente não encontrado',
            status: 400
        }));
}

clientController.newUser = (req, res) => {

    console.log('ok!' + '\n');
    console.log(req.body);

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
                    name: req.body.user.name,
                    phone: req.body.user.phone,
                    email: req.body.user.email,
                    birth: req.body.user.birth,
                    addr: req.body.user.addr,
                    modified: req.body.user.modified
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

clientController.updateUsers = (req, res) => {
    console.log('Buscando o put...');
    console.log(req.body)
    console.log(req.params);

    modelUser.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        },
        (err, user) => {

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
        }
    )

}

clientController.deleteUsers = (req, res) => {

    console.log(req.params);

    modelUser.findByIdAndRemove(req.params.id, (err, user) => {

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

/* ?
let client = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    birth: req.body.name,
}
*/