const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middleware/authMiddleware');

// Public route
router.get('/product/:productId', reviewController.getProductReviews);

// Protected route
router.post('/', authenticateToken, reviewController.addReview);

module.exports = router;
