const mongoose = require('../../database');

const beachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
    },
    tents: {
        type: Number,
        required: true
    },
    hotels: {
        type: Number,
        required: true
    },
    indicator: {
        type: Boolean,
        required: true
    },
    note: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const beach = mongoose.model('Beach', beachSchema);

module.exports = beach;