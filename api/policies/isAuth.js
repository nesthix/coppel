// policies/isauth.js
const jwt = require('jsonwebtoken');
module.exports = async function(req, res, proceed) {
    if (req.headers && req.headers.authorization) {
        let token = req.headers.authorization;
        if (token.length <= 0) {
            return res.json({
                success: false,
                message: 'El token es invalido'
            });
        }
        try {
            jwt.verify(token, sails.config.custom.secret);
            return proceed();
        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }
    }
    return res.forbidden();
};