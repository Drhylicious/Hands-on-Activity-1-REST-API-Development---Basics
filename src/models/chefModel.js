const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    specialty: {
        type: String,
        default: 'General',
    },
    experienceYears: {
        type: Number,
        min: [0, 'Experience cannot be negative'],
        max: [60, 'Experience seems unrealistic'],
        default: 0,
    },
}, { timestamps: true });
module.exports = mongoose.model('Chef', chefSchema);
