const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/', productController.readAll);

router.get('/:id', productController.readOne);

module.exports = router;