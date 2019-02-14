const routes = require('express').Router()
const clientController = require('../../controllers/clientes');
const productController = require('../../controllers/produtos');
const userController = require('../../controllers/user');
const sellController = require('../../controllers/vendas');
const caixaController = require('../../controllers/caixa')
const bodyParser = require('body-parser');

//const upload = multer({ dest: '../../uploads' });
const checkAuth = require('../../middleware/check-auth')

//? BP stuff parse various different custom JSON types as JSON
routes.use(bodyParser.json())
routes.use(bodyParser.urlencoded({extended: false}));
// parse various different custom JSON types as JSON
routes.use(bodyParser.json({type: 'application/json'}))

// parse some custom thing into a Buffer
routes.use(bodyParser.raw({type: 'application/vnd.custom-type'}))

// parse an HTML body into a string
routes.use(bodyParser.text({type: 'text/html'}))

routes.get('/api/v1/secret', (req, res) => {
    res.send('hello secret world!')
});

//! Login Auth with jwt
routes
    .route('/login')
    .post(userController.login)

// ? Routes to Client Post, Get, Delete and Put methods

routes
    .route('/api/v1/client/')
    .get(checkAuth, clientController.allUsers)
    .post(checkAuth, clientController.newUser)

routes
    .route('/api/v1/clients')
    .get(checkAuth, clientController.someUsers)
    .put(clientController.updateUsers)
    .delete(checkAuth, clientController.deleteUsers);

//? Routes to Products Post, Get, Delete and Put methods
routes
    .route('/api/v1/product')
    .get(checkAuth, productController.allProducts)
    .post(checkAuth, productController.newProducts)

// Aqui tem controllers que aceitam o parametro query
routes
    .route('/api/v1/products')
    .get(checkAuth, productController.someProducts)
    .put(productController.updateProducts)
    .delete(checkAuth, productController.deleteProducts)

routes
    .route('/api/v1/sell-product')
    .put(productController.updateSellProducts)
/**
|--------------------------------------------------
| Sell api, collect products, should process on Front-End and return the value for db
|--------------------------------------------------
*/
routes
    .route('/api/v1/sell-products')
    .get(checkAuth, productController.sellProducts)

routes
    .route('/api/v1/sells')
    .get(checkAuth, sellController.allSells)
    .post(checkAuth, sellController.newSells)

routes
    .route('/api/v1/closed-sells')
    .get(checkAuth, sellController.allClosedSells)
// ? query
routes
    .route('/api/v1/sell')
    .get(checkAuth, sellController.someSells)
    .put(sellController.updateSells)
    .delete(checkAuth, sellController.deleteSells)

routes
    .route('/api/v1/admin')
    .get(checkAuth, userController.allUsers)
    .post(checkAuth, userController.newUser)
    .delete(checkAuth, userController.deleteUser)

//* Count

routes
    .route('/api/v1/count/products')
    .get(checkAuth, productController.countProducts)
routes
    .route('/api/v1/count/clients')
    .get(checkAuth, clientController.countClients)
routes
    .route('/api/v1/count/open-sells')
    .get(checkAuth, sellController.countOpenSells)
routes
    .route('/api/v1/count/close-sells')
    .get(checkAuth, sellController.countClosedSells)

//* Sells

routes
    .route('/api/v1/count-sells')
    .get(checkAuth, sellController.countDataSells)

routes
    .route('/api/v1/values')
    .get(checkAuth, sellController.findSellsByDate)

routes
    .route('/api/v1/sells/date')
    .get(checkAuth, sellController.allClosedSellsByDate)

routes
    .route('/api/v1/today-values')
    .get(checkAuth, sellController.todaySales)


//caixa
routes.route('/api/v1/caixa')
    .get(caixaController.daily)
    .post(checkAuth, caixaController.newCaixa)
    
module.exports = routes