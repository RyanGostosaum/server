const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const consign = require('consign');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const routes = require('../server/routes/post/index');
const helmet  = require('helmet')


module.exports = () => {

    require('dotenv').config()
    
    const app = express();

    app.set('port', (process.env.PORT /*|| 3001 */));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cors());

    app.use(helmet());

    app.use(bodyParser.json());

    app.disable('x-powered-by');

    app.use(cookieParser());

    app.use(morgan('combined'));

    app.use(session({
        secret: 'ryan123',
        resave: false,    
        saveUninitialized: false
    }));

    app.use('/', routes);

    consign({
            cwd: '../server'
        })
        .include('/models/')
        .include('/controllers/')
        .then('/routes/')

        .into(app);

    return app;

}