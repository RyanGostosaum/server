const expect = require('chai').expect;

const userController = require('../server/controllers/user')


let req = {
    body: {
        username: 'RyanGostosinho', 
        password: 'ryan123'
    },
};

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('Post Route', function() {
    describe('userController() function', function() {
        it('Should do something', function() {
            userController.login(req, res); 
        });
    })
});