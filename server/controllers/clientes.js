const mongoose = require("mongoose");

const ClientSchema = require("../models/clientes");

const modelUser = mongoose.model("Client");


/*
    Crud começa aqui, os controllers definem as ações de cada rota
*/

let clientController = {};

clientController.allUsers = (req, res) => {

    modelUser
        .find()
        .then(results => res.json(results))
        .catch(err => res.send(err));
};

clientController.someUsers = (req, res) => {

    modelUser
        .findOne({
            'name': req.query.name
        })
        .then(results => {
            if (results.length > 0) {
                console.log('ERR');
            } else {
                res.json({
                    results,
                    success: true
                })
            }

        })
        .catch(err =>
            res.json({
                message: "Cliente não encontrado",
                status: 400
            })
        );
};

clientController.newUser = (req, res) => {

    modelUser
        .findOne({
            name: req.body.name
        })
        .then(user => {

            if (user) {
                res.json({
                    success: false,
                    message: "Esse nome já está cadastrado",
                    status: 400
                });
            } else {
                var client = new modelUser({
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    birth: req.body.birth,
                    addr: req.body.addr,
                    modified: req.body.modified
                });


                client
                    .save()

                    .then(() =>
                        res.json({
                            success: true,
                            message: "Cliente registrado!",
                            statusCode: 201
                        })
                    )

                    .catch(err =>
                        res.json({
                            success: false,
                            message: err,
                            statusCode: 500
                        })
                    );
            }
        });
};

clientController.updateUsers = (req, res) => {

    console.log(req.body);

    var client = req.body
    modelUser.findByIdAndUpdate(
        req.query.id, {
            name: client.nName,
            email: client.nemail,
            addr: client.naddr,
            phone: client.nContact
        },
        (err, user) => {
            if (user) {
                res.json({
                    message: "Update feito!",
                    statusCode: 201
                });
            } else {
                res.json({
                    message: "Error",
                    statusCode: 404
                });
            }
        }
    );
};

clientController.deleteUsers = (req, res) => {


    modelUser.findByIdAndRemove(req.query.id, (err, user) => {
        if (err) {
            res.json({
                message: "Error",
                statusCode: 400
            });
        } else {
            res.json({
                message: "Cliente deletado",
                data: user._id,
                statusCode: 201
            });
        }
    });
};

clientController.countClients = (req, res) => {

    modelUser.count({}, (err, count) => {
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