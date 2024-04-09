const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const Blog = require('./models/blogModel');
const User = require('./models/userModel');
require('dotenv').config();

const app = express();
const PORT = 3001;

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_CONNECT_URL; 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

    app.use(cors({
        origin: 'https://kozaleather.vercel.app',
        methods: ['GET', 'POST'],
        credentials: true
    }));

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use(express.json());

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (user) {
            // Return user ID if login successful
            res.json({ userId: user._id });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Signup endpoint
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add item to cart
app.post('/cart/add', async (req, res) => {
    const { productId, userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        user.cart.push(productId);
        await user.save();

        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove item from cart
app.delete('/cart/remove/:productId/:userId', async (req, res) => {
    const { productId, userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.cart = user.cart.filter(itemId => itemId.toString() !== productId);
        await user.save();

        res.json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get total price of items in cart
app.get('/cart/total/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('cart');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let totalPrice = 0;
        for (const item of user.cart) {
            totalPrice += item.price;
        }

        res.json({ totalPrice });
    } catch (error) {
        console.error('Error calculating total price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});