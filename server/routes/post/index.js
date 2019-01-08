const routes = require('express').Router()
const clientController = require('../../controllers/clientes');
const productController = require('../../controllers/produtos');
const userController = require('../../controllers/user');
const sellController = require('../../controllers/vendas');
const bodyParser = require('body-parser');

//const upload = multer({ dest: '../../uploads' });
const checkAuth = require('../../middleware/check-auth')

//? BP stuff
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


routes.get('/api/v1/secret', (req, res) => {
    res.send('hello secret world!')
});

//! Login Auth with jwt
routes.route('/login')
    .post(userController.login)

// ? Routes to Client Post, Get, Delete and Put methods

routes.route('/api/v1/client/')
    .get(checkAuth, clientController.allUsers)
    .post(checkAuth, clientController.newUser)

routes.route('/api/v1/clients/')
    .get(checkAuth, clientController.someUsers)
    .put(checkAuth, clientController.updateUsers)
    .delete(checkAuth, clientController.deleteUsers);

//? Routes to Products Post, Get, Delete and Put methods
routes.route('/api/v1/product')
    .get(productController.allProducts)
    .post(productController.newProducts)

// Aqui tem controllers que aceitam o parametro query
routes.route('/api/v1/products/')
    .get(checkAuth, productController.someProducts)
    .put(checkAuth, productController.updateProducts)
    .delete(checkAuth, productController.deleteProducts)

/**
|--------------------------------------------------
| Sell api, collect products, should process on Front-End and return the value for db
|--------------------------------------------------
*/
routes.route('/api/v1/sells')
    .get(checkAuth, sellController.allSells)
    .post(checkAuth, sellController.newSells)

// ? query
routes.route('/api/v1/sell/')
    .get(checkAuth, sellController.someSells)
    .put(checkAuth, sellController.updateSells)
    .delete(checkAuth, sellController.deleteSells)

routes.route('/api/v1/admin')
    .get(checkAuth, userController.allUsers)
    .post(checkAuth, userController.newUser)
    .delete(checkAuth, userController.deleteUser)

//* Count 

routes.route('/api/v1/count/products')
    .get(checkAuth, productController.countProducts)
routes.route('/api/v1/count/clients')
    .get(checkAuth, clientController.countClients)
routes.route('/api/v1/count/open-sells')
    .get(checkAuth, sellController.countOpenSells)

module.exports = routes