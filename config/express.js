const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

module.exports = () => {
    
    const app = express();

    app.set('port', (process.env.PORT || 3000));

    app.use(bodyParser.urlencoded({extended: true}));

    app.use(bodyParser.json());

    app.use(cookieParser());

    app.use(morgan('combined'));

    return app;

}