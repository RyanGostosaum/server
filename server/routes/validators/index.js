const Joi = require('joi');

module.exports = () => {

    const validatorClient = {
        name: Joi.string().alphanum().min(2).max(35).required(),
        email: Joi.string().email(),
        phone: Joi.string().required() ,
        birth: Joi.number().integer().min(1900).max(2018),
        street: Joi.string(),
        ngh: Joi.string(),
        city: Joi.string()
    }

    return validatorClient;
}