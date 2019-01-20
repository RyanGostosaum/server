const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret')
        req.userData = decoded;
        next();

    } catch (err) {

        console.error(err);
        
        return res.json({

            message: 'Token invalid',
            status: 400, 
            err: err

        })
    }
}