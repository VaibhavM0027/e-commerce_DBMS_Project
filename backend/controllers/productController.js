const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const filters = {
      category_id: req.query.category_id,
      search: req.query.search,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sortBy: req.query.sortBy
    };

    const products = await Product.getAll(filters);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// Get categories
exports.getCategories = async (req, res) => {
  try {
    const db = require('../config/database');
    const [rows] = await db.execute('SELECT * FROM categories ORDER BY category_name');

    res.json({
      success: true,
      categories: rows
    });
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};
