const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        jwt.verify(token, authConfig.secret);
        next();
    } catch (err) {
        res.status(401).send('Não autorizado');
    }

};