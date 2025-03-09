const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'Booked', // You can also have 'Pending', 'Completed', etc.
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
