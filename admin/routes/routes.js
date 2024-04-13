const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./images')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
});

var upload = multer({storage:storage}).single('image');

router.get("/",(req,res)=>{
    res.render('index',{title:'Home Page'})
});

router.get('/product',async(req,res)=>{
    const products = await Product.find();
    res.render('product',{title:'Products',products:products})
});

router.get('/addproduct',(req,res)=>{
    res.render('addproduct',{title:"Add Products"})
})

router.get('/addblog',(req,res)=>{
    res.render('addblog',{title:'Add Blogs'})
})

module.exports = router;