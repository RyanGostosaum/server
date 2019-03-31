const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const UserSchema = require('../models/user');

const UserModel = mongoose.model('User');

let UserController = {}

UserController.allUsers = (req, res) => {
    UserModel
        .find()
        .then(results => res.json(results))
        .catch(err => res.send(err));
}

UserController.login = (req, res, err) => {

    UserModel
        .findOne({username: req.body.username})
        .exec()
        .then(user => {

            if (user.length < 1) {
                return res.json({message: 'Username não encontrado ;(', status: 404});
            }

            bcrypt.compare(req.body.password, user.password, (err, resp) => {

                if (resp === true) {
                    const token = jwt.sign({
                        username: user.username,
                        userId: user._id
                    }, 'secret', {expiresIn: '10h'})
                    return res.json({message: 'Auth Success', token: token, success: true})
                } else {
                    return res.json({message: 'Auth fail'})
                }
            });
        })
        .catch(err => res.json({message: 'Auth fail', erro: err}))
}

UserController.newUser = (req, res) => {

    if (req.body.username && req.body.password) {

        UserModel
            .findOne({'username': req.body.username})
            .then(user => {
                if (user) {
                    res.json({success: false, message: 'Esse username não está disponível', status: 400})
                } else {

                    bcrypt
                        .hash(req.body.password, 8)
                        .then(hash => {

                            let cryptPass = hash

                            let user = new UserModel({name: req.body.name, email: req.body.email, username: req.body.username, password: cryptPass, isAdmin: req.body.isAdmin});

                            user
                                .save()
                                .then(() => res.json({message: 'Novo User criado', success: true, status: 201}))
                                .catch(err => res.json({success: false, message: err, status: 500}))
                        })
                        .catch(err => res.json({message: 'Error', err: err}))

                }
            })
    }
}

UserController.updateUser = (req, res) => {

    UserModel.findOneAndUpdate({
        _id: req.query._id
    }, {
        $set: {
            username: req.query.username
        }
    }, {new: true}).then((r) => {
        res.json({message: 'Update feito com sucesso', status: 201, res: r})
    }).catch(e => {
        console.log(e);
        res.json({
            message: 'Error', 
            status: 405
        })
    })
}

UserController.deleteUser = (req, res) => {

    UserModel.findOneAndRemove(req.query.username, (err, user) => {

        if (err) {

            res.json({message: 'Error'})
        } else {

            res.json({message: 'Delete feito com sucesso', status: 201})
        }
    })
}

module.exports = UserController;