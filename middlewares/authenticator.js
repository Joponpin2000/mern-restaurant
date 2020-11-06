const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const config = require('../config/config');

dotenv.config();
const jwtSecret = config.JWT_SECRET

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