const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cautionDeposit: {
        type: Number,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;