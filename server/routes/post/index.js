const routes = require('../../../config/express')();
const bodyParser = require('body-parser');
const Joi = require('joi');
const validatorClient = require('./validators/');

routes.post('/client', (req, res) => {

    const schema = validatorClient

    Joi.validate(data, schema, (err, value) => {

        if (err) {

            res.status(422).json({

                status: 'erro'
                
            })
        } else {

        }
    })
});