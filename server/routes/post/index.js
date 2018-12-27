const routes = require('express').Router()
const clientController = require('../../controllers/clientes');
const orderController = require('../../controllers/pedidos');
const userController = require('../../controllers/user');
const bodyParser = require('body-parser');
//const upload = multer({ dest: '../../uploads' });
const checkAuth = require('../../middleware/check-auth')


// parse various different custom JSON types as JSON
routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({
    extended: false
}));
// parse various different custom JSON types as JSON
routes.use(bodyParser.json({
    type: 'application/json'
}))

// parse some custom thing into a Buffer
routes.use(bodyParser.raw({
    type: 'application/vnd.custom-type'
}))


// parse an HTML body into a string
routes.use(bodyParser.text({
    type: 'text/html'
}))

routes.get('/api/v1/secret', checkAuth, (req, res) => {
    res.send('hello secret world!')
});

routes.route('/login')
    .post(userController.login)

routes.route('/api/v1/client/')
    .get(checkAuth, clientController.allUsers)
    .post(checkAuth, clientController.newUser)

routes.route('/api/v1/clients/:clientname')
    .get(checkAuth, clientController.someUsers)
    .put(checkAuth, clientController.updateUsers)
    .delete(checkAuth, clientController.deleteUsers);

routes.route('/api/v1/order')
    .get(checkAuth, orderController.allOrders)
    .post(checkAuth, orderController.newOrders)

routes.route('/api/v1/count/client')
    .get(checkAuth, clientController.countUsers)

routes.route('/api/v1/count/order')
    .get(checkAuth, orderController.countOrders)

routes.route('/api/v1/count/order/open')
    .get(checkAuth, orderController.countOpenOrders)

routes.route('/api/v1/count/order/close')
    .get(checkAuth, orderController.countCloseOrders)

routes.route('/api/v1/orders/:id')
    .get(checkAuth, orderController.someOrders)
    .put(checkAuth, orderController.updateOrders)
    .delete(checkAuth, orderController.deleteOrders)

routes.route('/api/v1/admin')
    .get(checkAuth, userController.allUsers)
    .post(checkAuth, userController.newUser)
    .delete(checkAuth, userController.deleteUser)


module.exports = routes