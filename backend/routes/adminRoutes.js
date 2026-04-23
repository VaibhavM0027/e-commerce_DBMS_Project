const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authorizeAdmin = require('../middleware/adminMiddleware');

// All admin routes require admin authorization
router.use(authorizeAdmin);

// Product management
router.post('/products', adminController.addProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Order management
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// User management
router.get('/users', adminController.getAllUsers);

// Dashboard stats
router.get('/stats', adminController.getDashboardStats);

module.exports = router;
