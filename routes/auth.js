const express = require('express');
const router = express.Router();
const { signupValidator, validatorResult, loginValidator } = require('../middlewares/validator');
const { signupController, loginController } = require('../controllers/auth');

router.post('/signup', signupValidator, validatorResult, signupController);

router.post('/login', (loginValidator, validatorResult, loginController));

module.exports = router;