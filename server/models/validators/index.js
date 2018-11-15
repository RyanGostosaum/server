const validate = require('mongoose-validator');

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]

module.exports = nameValidator;