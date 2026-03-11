const express = require('express');
const router = express.Router();

const {
    getAllDishes,
    createDish,
    getDishById,
    updateDish,
    deleteDish,
} = require('../controllers/dishController');

const {
    createChef,
    getAllChefs,
    getChefById,
} = require('../controllers/chefController');


router.get('/dishes', getAllDishes);
router.post('/dishes', createDish);
router.get('/dishes/:id', getDishById);
router.put('/dishes/:id', updateDish);
router.delete('/dishes/:id', deleteDish);

router.post('/chefs', createChef);
router.get('/chefs', getAllChefs);
router.get('/chefs/:id', getChefById);

module.exports = router;