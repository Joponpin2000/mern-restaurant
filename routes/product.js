const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { authenticateJWT, authenticateAdmin } = require('../middlewares/authenticator');
const upload = require('../middlewares/multer');
const checker = require('../middlewares/checker');

router.post('/', authenticateJWT, authenticateAdmin, upload.single('productImage'), checker, productController.create);
router.put('/:id', authenticateJWT, authenticateAdmin, upload.single('productImage'), checker, productController.update);
router.delete('/:id', authenticateJWT, authenticateAdmin, productController.delete);

module.exports = router;