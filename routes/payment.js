const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const { authenticateJWT } = require('../middlewares/authenticator');

router.post('/pay', authenticateJWT, paymentController.pay);
router.get('/callback', authenticateJWT, paymentController.verify);

module.exports = router;