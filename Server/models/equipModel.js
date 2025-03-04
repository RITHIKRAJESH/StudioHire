const mongoose = require('mongoose');

const equipSchema = new mongoose.Schema({
    ename: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'available'
    }
});

const Equip = mongoose.model('Equip', equipSchema);

module.exports = Equip;