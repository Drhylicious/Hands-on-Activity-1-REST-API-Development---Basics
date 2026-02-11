const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive'],
    },
    category: {
        type: String,
        enum: ['Starters', 'Main', 'Dessert', 'Drinks'],
        required: true,
    },
    isVegetarian: {
        type: Boolean,
        default: false,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            rating: { type: Number, min: 1, max: 5 },
            comment: String,
            createdAt: { type: Date, default: Date.now },
        },
    ],
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
    },
}, { timestamps: true });

module.exports = mongoose.model('Dish', dishSchema);