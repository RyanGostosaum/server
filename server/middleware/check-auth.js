const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret')
        req.userData = decoded;
        next();

    } catch (e) {

        console.log(e);
        return res.json({

            message: 'Token invalid',
            status: 400,
            token: 'Token invalid',
            success: false

        })
    }
}