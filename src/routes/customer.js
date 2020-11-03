const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer')();

router.post('/get', customerController.getCustomer);

module.exports = router;
