const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const User = require('../models/User');

exports.authenticateJWT = (req, res, next) => {

    try {
        const token = req.headers.authorization;
        const onlyToken = token.slice(7, token.length);

        if (!token) {
            return res.status(401).json({
                errorMessage: 'Authorization denied. You need to login',
            })
        }

        const decoded = jwt.verify(onlyToken, jwtSecret);
        req.user = decoded.user;
        next();
        return;
    } catch (err) {
        res.status(401).json({
            errorMessage: 'Authorization denied.',
        });
    }
};

exports.authenticateAdmin = async (req, res, next) => {
    try {
        const userDetails = await User.findById(req.user);

        if (req.user && (userDetails.role === 1)) {
            return next();
        }
        else {
            return res.status(401).json({
                errorMessage: 'Authorization denied.'
            })
        }
    } catch (err) {
        res.status(401).json({
            errorMessage: 'Authorization denied.',
        });
    }
};