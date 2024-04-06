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

})