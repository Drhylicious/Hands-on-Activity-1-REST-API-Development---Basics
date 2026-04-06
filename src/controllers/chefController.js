const Chef = require('../models/chefModel');

const createChef = async (req, res) => {
    try {
        const chef = await Chef.create(req.body);
        return res.status(201).json(chef);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getAllChefs = async (req, res) => {
    try {
        const chefs = await Chef.find();
        return res.status(200).json(chefs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getChefById = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) return res.status(404).json({ message: 'Chef not found' });
        return res.status(200).json(chef);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createChef,
    getAllChefs,
    getChefById,
};
