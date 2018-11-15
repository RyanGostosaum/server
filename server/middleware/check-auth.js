const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        
        console.log('Auth Success');
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret')
        req.userData = decoded;
        next();

    } catch (e) {

        return res.json({

            message: 'Token invalid',
            status: 400    

        })
    }
}