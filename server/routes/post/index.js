const routes = require('express').Router()
const clientController = require('../../controllers/clientes');
const productController = require('../../controllers/produtos');
const userController = require('../../controllers/user');
const bodyParser = require('body-parser');
const checkAuth = require('../../middleware/check-auth')


// parse various different custom JSON types as JSON
routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({
    extended: true
}));

// parse an HTML body into a string
routes.use(bodyParser.text({
    type: 'text/html'
}))

routes.get('/', checkAuth, (req, res) => {
    res.send('hello world!')
});
routes.get('/secret', checkAuth, (req, res) => {
    res.send('hello secret world!')
});

routes.route('/login')
    .post(userController.login)

routes.route('/client/')
    .get(checkAuth, clientController.allUsers)
    .post(checkAuth, clientController.newUser)

routes.route('/client/:id')
    .get(checkAuth, clientController.someUsers)
    .put(checkAuth, clientController.updateUsers)
    .delete(checkAuth, clientController.deleteUsers);

routes.route('/product')
    .get(checkAuth, productController.allProducts)
    .post(checkAuth, productController.newProducts)

routes.route('/product/:id')
    .get(checkAuth, productController.someProducts)
    .put(checkAuth, productController.updateProducts)
    .delete(checkAuth, productController.deleteProducts)

routes.route('/admin')
    .get(checkAuth, userController.allUsers)
    .post(checkAuth, userController.newUser)
    .delete(checkAuth, userController.deleteUser)


module.exports = routes