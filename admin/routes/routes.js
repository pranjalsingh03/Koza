const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,file.filename+'_'+Date.now()+"_"+file.originalname)
    }
});

var upload = multer({
    storage:storage
}).single('image');

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

router.post('/addproduct', upload, async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.file.filename,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category
        });
        await product.save();
        req.session.message = {
            type: 'success',
            message: 'Product Added Successfully'
        };
        res.redirect('/product');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//edit the product
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    try {
        const product = await Product.findById(id).exec();
        if (!product) {
            return res.redirect('/product');
        }
        res.render('editproduct', { title: 'Edit Product', product: product });
    } catch (error) {
        console.error(error);
        res.redirect('/product');
    }
});

//Update the product
router.post('/update/:id', upload, async (req, res) => {
    try {
        let id = req.params.id;
        let new_image = '';
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }

        await Product.findByIdAndUpdate(id, {
            name: req.body.name,
            image: new_image,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category
        });

        req.session.message = {
            type: 'success',
            message: 'Product Updated Successfully'
        };
        res.redirect('/product');
    } catch (error) {
        console.error(error);
        res.redirect('/product');
    }
});


//delete a particular record from database using delete method
router.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);

        if (product.image) {
            try {
                fs.unlinkSync('./uploads/' + product.image);
            } catch (err) {
                console.log(err);
            }
        }

        req.session.message = {
            type: 'success',
            message: 'Product Deleted Successfully'
        };
        res.redirect('/product');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;