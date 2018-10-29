const routes = require('express').Router()
const clientController = require('../../controllers/clientes')

routes.get('/', (req, res) => {
    res.send('hello world!')
});

routes.route('/api/client')
    .get(clientController.allUsers)
    .post(clientController.newUser)

    
module.exports = routes