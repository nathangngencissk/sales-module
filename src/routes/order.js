const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order')();

router.post('/buy', orderController.buy);

module.exports = router;
