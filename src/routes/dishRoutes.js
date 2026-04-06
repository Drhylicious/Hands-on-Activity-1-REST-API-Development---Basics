const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middleware/authMiddleware');
const { getAllDishes, createDish } = require('../controllers/dishController');

router.get('/', getAllDishes);

router.post('/', protect, authorize('admin', 'manager'), createDish);

module.exports = router;
