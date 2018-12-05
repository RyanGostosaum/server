const routes = require('express').Router()
const clientController = require('../../controllers/clientes');
const productController = require('../../controllers/produtos');
const userController = require('../../controllers/user');
const fileController = require('../../controllers/xml/index');
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

routes.route('/', checkAuth)
    .post(fileController.upload)

routes.get('/api/v1/secret', (req, res) => {
    res.send('hello secret world!')
});

routes.route('/login')
    .post(userController.login)

routes.route('/api/v1/client/')
    .get(checkAuth, clientController.allUsers)
    .post(checkAuth, clientController.newUser)

routes.route('/api/v1/client/:id')
    .get(checkAuth, clientController.someUsers)
    .put(checkAuth, clientController.updateUsers)
    .delete(checkAuth, clientController.deleteUsers);

routes.route('/api/v1/product')
    .get(checkAuth, productController.allProducts)
    .post(checkAuth, productController.newProducts)

routes.route('/api/v1/product/:id')
    .get(checkAuth, productController.someProducts)
    .put(checkAuth, productController.updateProducts)
    .delete(checkAuth, productController.deleteProducts)

routes.route('/api/v1/admin')
    .get(checkAuth, userController.allUsers)
    .post(checkAuth, userController.newUser)
    .delete(checkAuth, userController.deleteUser)


module.exports = routes