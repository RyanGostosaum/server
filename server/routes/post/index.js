const routes = require('express').Router()
const clientController = require('../../controllers/clientes');
const productController = require('../../controllers/produtos');
const userController = require('../../controllers/user');
const bodyParser = require('body-parser');

// parse various different custom JSON types as JSON
routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({
    extended: true
}));

// parse an HTML body into a string
routes.use(bodyParser.text({
    type: 'text/html'
}))

routes.get('/', (req, res) => {
    res.send('hello world!')
});

routes.post('/api', function (req, res) {

    res.send('dados recebidos ' + JSON.stringify(req.body))

    console.log(JSON.stringify(req.body));
})

routes.route('/api/client/')
    .get(clientController.allUsers)
    .post(clientController.newUser)

routes.route('/api/client/:id')
    .get(clientController.someUsers)
    .put(clientController.updateUsers)
    .delete(clientController.deleteUsers);

routes.route('/api/product')
    .get(productController.allProducts)
    .post(productController.newProducts)

routes.route('/api/product/:id')
    .get(productController.someProducts)
    .put(productController.updateProducts)
    .delete(productController.deleteProducts)

routes.route('/api/newAdmin')
    .get(userController.allUsers)
    .post(userController.newUser)
    .delete(userController.deleteUser)

module.exports = routes