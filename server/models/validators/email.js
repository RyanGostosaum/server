const validate = require('mongoose-validator');

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Valor fornecido não é um email',
        passIfEmpty: true,
    })
]

module.exports = emailValidator;