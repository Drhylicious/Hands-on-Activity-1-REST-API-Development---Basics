const express = require('express');
const router = express.Router();
const Chef = require('../models/chefModel');

router.post('/chefs', async (req, res) => {
    try {
        const chef = await Chef.create(req.body);
        res.status(201).json(chef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
