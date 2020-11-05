const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')();

router.get('/get_products', productController.getProducts);
router.get('/get', productController.getAll);
router.post('/add', productController.add);
router.post('/add_to_cart', productController.addToCart);
router.post('/remove_from_cart', productController.removeFromCart);

module.exports = router;
