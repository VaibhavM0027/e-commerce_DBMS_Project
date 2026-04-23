const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateToken = require('../middleware/authMiddleware');

// All cart routes require authentication
router.use(authenticateToken);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/:id', cartController.updateCartItem);
router.delete('/:id', cartController.removeFromCart);

module.exports = router;
