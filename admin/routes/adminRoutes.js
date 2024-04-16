const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../auth/authMiddleware');

// Middleware for session management
router.use(authMiddleware);

// Protected routes
router.get('/login', adminController.login);
router.get('/', adminController.dashboard);
router.get('/products', adminController.loadProducts);
router.get('/addProduct', adminController.loadAddProduct);
router.post('/addProduct', adminController.addProduct);
router.get('/editProduct/:id', adminController.loadEditProduct);
router.put('/editProduct/:id', adminController.editProduct);
router.delete('/removeProduct/:id', adminController.removeProduct);

module.exports = router;