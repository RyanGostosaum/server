const routes = require('express').Router()
const clientController = require('../../controllers/clientes');
const bodyParser = require('body-parser');
const express = require('express')

// parse various different custom JSON types as JSON
routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({extended:true}));

// parse an HTML body into a string
routes.use(bodyParser.text({ type: 'text/html' }))

routes.get('/', (req, res) => {
    res.send('hello world!')
});

routes.post('/api', function (req, res) {

    res.send('dados recebidos ' + JSON.stringify(req.body))

    console.log(JSON.stringify(req.body));
})

routes.route('/api/client')
    .get(clientController.allUsers)
    .post(clientController.newUser)


module.exports = routes