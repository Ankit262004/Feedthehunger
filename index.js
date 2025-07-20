require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.error("MongoDB Connection Error:", error);
});

database.once('connected', () => {
    console.log('✅ MongoDB Database Connected');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Home Route
app.get('/', (req, res) => {
    res.send("🚀 Welcome to the Food Donation Home Page!");
});

// User Routes
const userController = require('./controller/User_Controller');
app.use('/user', userController);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server Started at http://localhost:${PORT}`);
});
