const Review = require('../models/Review');

// Add review
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const reviewId = await Review.create({
      user_id: req.user.userId,
      product_id: productId,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      reviewId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    });
  }
};

// Get product reviews
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.getByProduct(req.params.productId);

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
      error: error.message
    });
  }
};
