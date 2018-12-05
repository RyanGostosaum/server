const validate = require('mongoose-validator');

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 50],
        message: 'Nome precisa estar entre {ARGS[0]} e {ARGS[1]} chars',
    })
]

module.exports = nameValidator;