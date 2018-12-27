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

    console.log('Buscando...' + JSON.stringify(req.params.clientname));

    modelUser.findOne({
            'name': req.params.clientname
        })
        .then(results => {
            res.json(results)
            console.log(JSON.stringify(results))
        })
        .catch(err => res.json({
            message: 'Cliente não encontrado',
            status: 400
        }));
}

clientController.countUsers = (req, res) => {

    modelUser.count({}, (err, count) => {
        res.json({
            cadastros: count,
            success: true
        })
    })
}
clientController.newUser = (req, res) => {

    console.log('ok!' + '\n');
    //console.log(req.body.data);
    const about = req.body.data[0]
    const type = req.body.data[1]
    const address = req.body.data[2]
    const trueAddr = [address][0].address.street + ', ' + [address][0].address.number + ', ' + [address][0].address.city + ', ' + [address][0].address.simpleSelect

    var data = [type][0].account
    var account = Object.keys(data).filter((key) => {
        return data[key] === true
    })


    //console.log(JSON.stringify([about][0].about.name) + '\n' + type + '\n' + address);
    modelUser.findOne({
            'name': [about][0].about.name
        })
        .then(user => {

            if (user) {

                res.json({

                    success: false,
                    message: 'Esse nome já está cadastrado'

                });

            } else {

                console.log('Progresso');

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

                console.log(JSON.stringify(client) + ' São os inputs');

                client.save()

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
