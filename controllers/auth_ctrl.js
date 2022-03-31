const jwt = require('jsonwebtoken')
require('dotenv').config()

let self = {};

self.validateUser = async (req, res, next) => {
        jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY, function (err, token) {
            if (err) {
                return res.status(401).json({status:"error", message: err.message, data:null})
            } else {
                req.body.user_id = token.id;
                next()
            }
        })
}
module.exports = self;