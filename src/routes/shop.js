const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop')();

router.get('/get', shopController.getAll);
router.post('/add', shopController.add);
router.put('/edit/:id', shopController.edit);
router.delete('/delete/:id', shopController.delete);

module.exports = router;
