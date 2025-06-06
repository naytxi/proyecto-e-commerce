const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const verificarToken = require('../auth/authMiddleware');

router.post('/', verificarToken, ReviewController.create);
router.get('/', ReviewController.getAll);
router.delete('/:id', verificarToken, ReviewController.delete);

module.exports = router;
