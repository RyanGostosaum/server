const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const UserSchema = require('../models/user');

const UserModel = mongoose.model('User');

let UserController = {}

UserController.allUsers = (req, res) => {

    UserModel.find()
        .then(results => res.json(results))
        .catch(err => res.send(err));
}

UserController.login = (req, res, err) => {

    console.log(req.body)

    UserModel.findOne({
            username: req.body.username
        })
        .exec()
        .then(user => {

            if (user.length < 1) {

                console.log('Deu ruim demais');
                return res.json({

                    message: 'Username não encontrado ;(',
                    success: false
                });

            }

            bcrypt.compare(req.body.password, user.password, (err, resp) => {

                if (resp === true) {

                    const token = jwt.sign({
                            username: user.username,
                            userId: user._id,
                        },
                        'secret', {
                            expiresIn: '8h'
                        }
                    )

                    return res.json({
                        message: 'Auth Success',
                        success: true,
                        token: token,
                        status: 200
                    })

                } else {

                    return res.json({
                        message: 'Auth fail',
                        status: 400,
                        success: false
                    })
                }

            });
        })
        .catch(err => res.json({

            message: 'Auth fail',
            erro: err,
            status: 400,
            success: false
        }))
}

UserController.newUser = (req, res) => {
    if (req.body.username && req.body.password) {

        UserModel.findOne({
                'username': req.body.username
            })

            .then(user => {

                if (user) {
                    res.json({

                        success: false,
                        message: 'Esse username não está disponível'

                    })
                } else {

                    bcrypt.hash(req.body.password, 8)

                        .then(hash => {

                            let cryptPass = hash

                            let user = new UserModel({
                                username: req.body.username,
                                password: cryptPass,
                                isAdmin: req.body.isAdmin
                            });

                            user.save()

                                .then(() => res.json({
                                    message: 'Novo User criado',
                                    success: true,
                                    status: 201
                                }))

                                .catch(err => res.json({
                                    success: false,
                                    message: err,
                                    status: 500
                                }))
                        })
                        .catch(err => res.json({
                            message: 'Error',
                            err: err
                        }))

                }
            })
    }
}

UserController.deleteUser = (req, res) => {

    UserModel.findOneAndRemove(req.body.username, (err, user) => {

        if (err) {

            res.json({
                message: 'Error'
            })
        } else {

            res.json({
                message: 'Delete feito com sucesso',
                status: 201
            })
        }
    })
}

module.exports = UserController;