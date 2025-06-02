const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/id/:id', CategoryController.getById);
router.get('/name/:name', CategoryController.getByName);
router.put('/id/:id', CategoryController.update);
router.delete('/id/:id', CategoryController.delete);

module.exports = router;
