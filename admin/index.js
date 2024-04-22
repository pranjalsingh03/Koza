const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_ADMIN = process.env.MONGODB_CONNECT_URL;

// Middleware
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
app.use(
    session({secret : 'mysecret', saveUninitialized : false, resave : false}));
app.use(express.static('uploads'));
app.set('view engine', 'ejs');
app.set("layouts", "./layouts/main");

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// Database connection
mongoose
    .connect(MONGODB_ADMIN, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Database connection error:', err));

// Routes
app.use("/", require("./routes/admin"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => { console.log(`Server is running on port:${PORT}`); });
