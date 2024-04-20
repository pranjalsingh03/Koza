const Product = require("../models/productModel");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const adminController = {
  async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) {
        req.session.message = {
          type : "error",
          message : "Invalid username or password",
        };
        return res.redirect("/admin/login");
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        req.session.message = {
          type : "error",
          message : "Invalid username or password",
        };
        return res.redirect("/admin/login");
      }
      req.session.user = user;
      res.redirect("/admin/product");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  async logout(req, res) {
    try {
      req.session.destroy();
      res.redirect("/admin/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  dashboard(req, res) { res.render("index", {title : "Dashboard"}); },

  async loadProducts(req, res) {
    try {
      const products = await Product.find();
      res.render("product", {title : "Products", products : products});
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  loadAddProduct(req,
                 res) { res.render("addProduct", {title : "Add Product"}); },

  async addProduct(req, res) {
    try {
      const product = new Product({
        name : req.body.name,
        image : req.file.filename,
        price : req.body.price,
        discount : req.body.discount,
        category : req.body.category,
      });
      await product.save();
      req.session.message = {
        type : "success",
        message : "Product Added Successfully",
      };
      res.redirect("/admin/products");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  async loadEditProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.redirect("/admin/products");
      }
      res.render("editProduct", {title : "Edit Product", product : product});
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  async editProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.redirect("/admin/products");
      }

      // Update product fields
      product.name = req.body.name;
      product.price = req.body.price;
      product.discount = req.body.discount;
      product.category = req.body.category;
      if (req.file) {
        product.image = req.file.filename;
      }

      await product.save();

      req.session.message = {
        type : "success",
        message : "Product Updated Successfully",
      };
      res.redirect("/admin/products");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  async removeProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      req.session.message = {
        type : "success",
        message : "Product Deleted Successfully",
      };
      res.redirect("/admin/products");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = adminController;
