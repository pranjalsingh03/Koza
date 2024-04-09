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


app.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await User.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})


app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await User.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await User.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

});

app.post('/cart/add', async (req, res) => {
    const { productId, userId } = req.body;

    try {
        // Find user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find product by productId
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Add product to user's cart
        user.cart.push(product);
        await user.save();

        res.json(user.cart); // Return updated cart
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove item from cart
app.delete('/cart/remove/:productId/:userId', async (req, res) => {
    const { productId, userId } = req.params;

    try {
        // Find user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove product from user's cart
        user.cart = user.cart.filter(item => item.toString() !== productId);
        await user.save();

        res.json(user.cart); // Return updated cart
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/cart/total/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find user by userId
        const user = await User.findById(userId).populate('cart');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate total price
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