const Dish = require('../models/dishModel');

const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        return res.status(200).json(dishes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createDish = async (req, res) => {
    try {
        const newDish = await Dish.create(req.body);
        return res.status(201).json(newDish);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        return res.status(200).json(dish);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        return res.status(200).json(dish);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deleteDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        return res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDishes,
    createDish,
    getDishById,
    updateDish,
    deleteDish,
};