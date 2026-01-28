const express = require('express');
const router = express.Router();
const data = require('../models/dishModel');

router.get('/dishes', (req, res) => {
    const { category, price, name, isVegetarian } = req.query;

    let filteredDishes = data
        .filter(
            (dish) =>
                !category ||
                dish.category.toLowerCase() === category.toLowerCase()
        )
        .filter(
            (dish) =>
                !price || dish.price <= parseFloat(price)
        )
        .filter(
            (dish) =>
                !name ||
                dish.name.toLowerCase().includes(name.toLowerCase())
        )
        .filter(
            (dish) =>
                isVegetarian === undefined ||
                dish.isVegetarian === (isVegetarian === 'true')
        );

    if (filteredDishes.length === 0) {
        return res.status(404).json({
            status: 404,
            message: 'No dishes found matching the criteria',
            data: [],
        });
    }

    res.status(200).json({
        status: 200,
        message: 'Retrieved dishes successfully',
        data: filteredDishes,
    });
});

router.post('/dishes', (req, res) => {
    const { name, price, category, isVegetarian } = req.body;

    if (!name || !price || !category || isVegetarian === undefined) {
        return res.status(400).json({
            status: 400,
            message:
                'Bad Request: name, price, category, and isVegetarian are required',
            data: null,
        });
    }

    const newItem = {
        id: data.length + 1,
        name,
        price,
        category,
        isVegetarian,
    };

    data.push(newItem);

    res.status(201).json({
        status: 201,
        message: 'Dish created successfully',
        data: newItem,
    });
});

router.put('/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((d) => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Dish with ID ${id} not found`,
            data: null,
        });
    }

    data[index] = { id, ...req.body };

    res.status(200).json({
        status: 200,
        message: 'Dish updated successfully',
        data: data[index],
    });
});

router.delete('/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex((d) => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Dish with ID ${id} not found`,
            data: null,
        });
    }

    data.splice(index, 1);

    res.status(200).json({
        status: 200,
        message: 'Dish deleted successfully',
        data: null,
    });
});

module.exports = router;
