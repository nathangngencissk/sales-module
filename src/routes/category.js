const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category')();

router.get('/', categoryController.getAll);
router.post('/add', categoryController.add);
router.put('/edit/:id', categoryController.edit);
router.delete('/delete/:id', categoryController.delete);

module.exports = router;
