const express = require('express');
const router = express.Router();
const Food = require('./model/Food');
const upload = require('../middleware/multer');

// Home route
router.get('/', (req, res) => {
    res.send("Welcome to Food Donation - Food Service");
});

// Add food donation
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { foodName, quantity, expiryDate, foodType, donorId, location } = req.body;

        if (!req.file) return res.status(400).json({ error: 'Food image is required' });

        const newFood = new Food({
            foodName,
            quantity,
            expiryDate,
            foodType,
            image: req.file.filename,
            donorId,
            location
        });

        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all available food
router.get('/getall', async (req, res) => {
    try {
        const foods = await Food.find().populate('donorId', 'fullName email');
        const result = foods.map(food => ({
            ...food._doc,
            image: `${req.protocol}://${req.get('host')}/uploads/${food.image}`
        }));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get food by ID
router.get('/get/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id).populate('donorId', 'fullName email');
        if (!food) return res.status(404).json({ message: 'Food not found' });

        res.json({
            ...food._doc,
            image: `${req.protocol}://${req.get('host')}/uploads/${food.image}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update food
router.patch('/update/:id', async (req, res) => {
    try {
        const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete food
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleted = await Food.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Food not found' });

        res.send(`Food item "${deleted.foodName}" has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Filter by type
router.get('/filterbytype/:type', async (req, res) => {
    try {
        const type = req.params.type.toLowerCase();
        const foods = await Food.find({ foodType: type });
        const result = foods.map(f => ({
            ...f._doc,
            image: `${req.protocol}://${req.get('host')}/uploads/${f.image}`
        }));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
