const routes = require('express').Router()
const clientController = require('../../controllers/clientes');
const bodyParser = require('body-parser');

routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({extended: true}))

routes.get('/', (req, res) => {
    res.send('hello world!')
});

routes.route('/api/client')
    .get(clientController.allUsers)
    .post(clientController.newUser)


module.exports = routes