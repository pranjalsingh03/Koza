const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const bcrypt = require("bcrypt")
const Blog = require("./models/blogModel")
require('dotenv').config();
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const Razorpay = require('razorpay');
const crypto = require("crypto");
const Cart = require('./models/cartModel');
const Review = require('./models/reviewModel');
const Payment = require('./models/paymentModel');
const Newsletter = require('./models/newsletterModel');
const nodemailer = require("nodemailer");
const Contactus = require('./models/contactusModel');

const app = express();
const PORT = 3001;

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_CONNECT_URL;
const JWT_key = process.env.JWT_SKEY;
const CORS_URI = process.env.CORS_URI;

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
    origin: 'https://kuzeleather.vercel.app',
    // origin: 'http://localhost:3002',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));

//RazorPay integration

const instance = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.USER,
        pass: process.env.USER_PASS,
    },
});

const mailOptions = {
    from: {
        name: "Kuze Leather <noreply@kuze-leather.com>",
        address: process.env.USER
    },
    to: "pranjalsingh9304@gmail.com",
    subject: "Welcome to Kuze Leather",
    text: "Thank you for subscribing to our newsletter. Stay tuned for more updates!",
    html: "<p>Thank you for subscribing to our newsletter. Stay tuned for more updates!</p>"
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_key, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = { userId: user.userId };
        next();
    });
};

app.post("/checkout", async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };

    try {
        const order = await instance.orders.create(options);
        // console.log(order);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            order
        });
    } catch (error) {
        // console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Error creating order"
        });
    }
});


app.post('/isAuthenticated', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_KEY_SECRET)
        .update(body)
        .digest('hex');

    isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        });
        res.redirect(`https://kuzeleather.vercel.app/paymentsuccess?reference=${razorpay_payment_id}`);
    } else {
        res.redirect(`https://kuzeleather.vercel.app/paymentfailed?error=Invalid signature`)
    }
});

app.get("/meowmeow", (req, res) => {
    res.status(200).json({ key: process.env.RAZOR_KEY_ID });
})

app.post('/cart/add', async (req, res) => {
    try {
        const { name, price, image, quantity } = req.body;
        const cartItem = { name, price, image, quantity };

        const cart = await Cart.findOneAndUpdate(
            {},
            { $push: { items: cartItem } },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: 'Product added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/carts', async (req, res) => {
    try {
        const cart = await Cart.find();
        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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


app.get('/product/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Signup endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_key, { expiresIn: '7d' });

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/review', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/review', async (req, res) => {
    const review = new Review({
        name: req.body.name,
        rating: req.body.rating,
        comment: req.body.comment
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/review/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.post("/newsletter", async(req,res)=>{
//     const {email} = req.body;
//     try {
//         const newEmail = new Newsletter({email});
//         await newEmail.save();
//         res.status(201).json({message: "Email added to newsletter"});
//         try{
//             await transporter.sendMail(mailOptions);
//             console.log("Email sent successfully");
//         }catch(error){
//             console.log("There was an issue sending the email:", error);
//         }
//     } catch (error) {
//         console.error("Error adding email to newsletter:", error);
//         res.status(500).json({error: "Internal server error"});
//     }
// })

app.post("/newsletter", async (req, res) => {
    const { email } = "singhmagan9304@gmail.com";
    try {
        const newEmail = new Newsletter({ email });
        await newEmail.save();
        mailOptions.to = email;
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.status(201).json({ message: "Email added to newsletter and sent successfully" });
    } catch (error) {
        console.error("Error adding email to newsletter or sending email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/contactus', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContactus = new Contactus({ name, email, message });
        await newContactus.save();
        res.status(201).json({ message: 'Contact details saved successfully' });
    } catch (error) {
        console.error('Error saving contactus details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});