const routes = require('../../../config/express')();

routes.get('/', (req, res) => {
    res.send('hello world!')
});

module.exports = routes;