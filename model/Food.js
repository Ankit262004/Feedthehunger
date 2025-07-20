const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number, // in kilograms or number of items
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    foodType: {
        type: String,
        enum: ['vegetarian', 'non-vegetarian'],
        required: true
    },
    image: {
        type: String,
        required: true // filename of uploaded image
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'picked up', 'expired'],
        default: 'available'
    }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
