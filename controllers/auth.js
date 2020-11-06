const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const config = require('../config/config');

dotenv.config();

const jwtSecret = config.JWT_SECRET;
const jwtExpire = config.JWT_EXPIRE;

exports.signupController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errorMessage: 'Email already exist',
            });
        }
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        res.json({
            successMessage: 'Registration success. Please signin.'
        });

    } catch (err) {
        res.status(500).json({
            errorMessage: 'Server error'
        });

    }
}


exports.loginController = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            });
        }

        const payload = {
            user: {
                _id: user._id,
            }
        };

        jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {

            if (err) {
                res.status(500).json({
                    errorMessage: 'Server error'
                });
            }

            const { _id, username, email, role } = user;

            res.json({
                token,
                user: { _id, username, email, role },
            });

            res.cookie('token', token, { expires: 1, secure: false, httpOnly: true, }); // TODO: set secure to true if https.
        });

    } catch (err) {
        res.status(500).json({
            errorMessage: 'Server error'
        });
    }
}