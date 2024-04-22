const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_Key;

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

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};


router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "NodeJS in MongoDB",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.get("/",(req,res)=>{
  res.render("admin/index",{title:"Admin Login"})
})



router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/admin/product");
  } catch (error) {
    console.log(error);
  }
});

router.post("/register",async(req,res)=>{
  try{
    const {username,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try{
      const user = await User.create({username,password:hashedPassword});
      res.status(201).json({message:"User created!",user});
    }catch(error){
      if(error.code === 11000){
        res.status(409).json({message:"User already in use"});
      }
      res.status(500).json({message:"Internal server error"});
    }
  }catch(error){
    console.log(error);
  }
})


router.get('/admin/product',authMiddleware,async(req,res)=>{
  const products = await Product.find();
  res.render('admin/product',{title:'Products',products:products})
});

router.get("/admin/addproduct", authMiddleware, async (req, res) => {
  const products = await Product.find();
  res.render("admin/addproduct", { title: "Add Product", products: products });
});

router.post('/addproduct',authMiddleware, upload, async (req, res) => {
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
      res.redirect('/admin/product');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

router.post('/admin/update/:id',authMiddleware, upload, async (req, res) => {
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
      res.redirect('/admin/product');
  } catch (error) {
      console.error(error);
      res.redirect('/admin/product');
  }
});

router.get("/admin/delete/:id", async (req, res) => {
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
      res.redirect('/admin/product');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});
router.get("/admin/highLightTitle.png" , (req,res)=>{
  res.send("you get it!")
})

router.get("/admin/edit/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.redirect("/admin/product");
    }
    res.render("admin/editproduct", { title: "Edit Product", product: product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/admin/edit/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.redirect("/admin/product");
    }
    product.name = req.body.name;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.category = req.body.category;
    if (req.file) {
      product.image = req.file.filename;
    }

    await product.save();

    req.session.message = {
      type: "success",
      message: "Product Updated Successfully",
    };
    res.redirect("/admin/product");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
);

router.delete("/admin/removeproduct/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    req.session.message = {
      type: "success",
      message: "Product Deleted Successfully",
    };
    res.redirect("/admin/product");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// router.get('/admin/edit/:id', async (req, res) => {
//   let id = req.params.id;
//   try {
//       const product = await Product.findById(id).exec();
//       if (!product) {
//           return res.redirect('/product');
//       }
//       res.render('/admin/editproduct', { title: 'Edit Product', product: product });
//   } catch (error) {
//       console.error(error);
//       res.redirect('admin/product');
//   }
// });


router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
