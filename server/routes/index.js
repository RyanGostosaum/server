const routes = require('express').Router()
const userController = require('../controllers/user');
const bodyParser = require('body-parser');
//const upload = multer({ dest: '../../uploads' });
const checkAuth = require('../middleware/check-auth')

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


//! Login Auth with jwt
routes.route('/login')
    .post(userController.login)



routes.route('/api/user')
    .get(checkAuth, userController.allUsers)
    .post(checkAuth, userController.newUser)
    .delete(checkAuth, userController.deleteUser)
module.exports = routes