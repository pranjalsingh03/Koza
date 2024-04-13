const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const app = express();
const PORT = 4000;

const MONGODB_ADMIN = process.env.MONGODB_CONNECT_URL;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
        secret: "my secret",
        saveUninitialized: false,
        resave: false
    })
);
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.set("view engine", "ejs");

mongoose.connect(MONGODB_ADMIN, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Database"));

app.use("", require('./routes/routes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
