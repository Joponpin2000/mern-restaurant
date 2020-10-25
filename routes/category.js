const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { authenticateJWT, authenticateAdmin } = require('../middlewares/authenticator');

router.post('/', authenticateJWT, authenticateAdmin, categoryController.create);
router.get('/', authenticateJWT, authenticateAdmin, categoryController.readAll);

module.exports = router;