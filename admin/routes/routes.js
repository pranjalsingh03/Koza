const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const multer = require('multer');

var storage = multer.diskStorage({
  destination : function(req, file, cb) { cb(null, './images') },
  filename : function(req, file, cb) { cb(null, file.originalname) }
});

var upload = multer({storage : storage}).single('image');

router.get("/", (req, res) => {res.render('index', {title : 'Home Page'})});

router.get('/product', async (req, res) => {
  const products = await Product.find();
  res.render('product', {title : 'Products', products : products})
});

router.get('/addproduct',
           (req, res) => {res.render('addproduct', {title : "Add Products"})})

router.get('/addblog',
           (req, res) => {res.render('addblog', {title : 'Add Blogs'})})

router.post('/addproduct', upload, async (req, res) => {
  const product = new Product({
    name : req.body.name,
    image : req.file.originalname,
    price : req.body.price,
    discount : req.body.discount
  })
  try {
    await product.save();
    res.redirect('/product');
  } catch (err) {
    console.log(err);
  }
})

// update the data in database using put method
router.put("/edit/:id", upload, async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    // Checking for old and new images
    if (!req.file) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.discount = req.body.discount;
      await product.save();
    } else {
      product.image = req.file.originalname;
      product.name = req.body.name;
      delete req.body.image;
      Object.assign(product, req.body);
      await product.save();
    }
    res.redirect('/product');
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// delete a particular record from database using delete method
router.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await Product.findByIdAndRemove(id, (err, product) => {
      if (err) {
        console.log(err);
      }
    });

    res.redirect('/product');
  } catch (e) {
    console.log(e);
  }
})

module.exports = router;