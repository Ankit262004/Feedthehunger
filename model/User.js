const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    fullName: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    },
    userType: {
        required: true,
        type: String,
        enum: ['donor', 'receiver'] // ensures only valid values
    },
    foodPreference: {
        required: true,
        type: String,
        enum: ['vegetarian', 'non-vegetarian', 'both']
    },
    image: {
        required: true,
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
