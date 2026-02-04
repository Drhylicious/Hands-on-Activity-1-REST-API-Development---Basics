const express = require('express');
const router = express.Router();

const {
    getAllDishes,
    createDish,
    getDishById,
    updateDish,
    deleteDish,
} = require('../controllers/dishController');

router.get('/dishes', getAllDishes);
router.post('/dishes', createDish);
router.get('/dishes/:id', getDishById);
router.put('/dishes/:id', updateDish);
router.delete('/dishes/:id', deleteDish);

module.exports = router;