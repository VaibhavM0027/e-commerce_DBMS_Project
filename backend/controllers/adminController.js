const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const db = require('../config/database');

// Add product
exports.addProduct = async (req, res) => {
  try {
    const productId = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      productId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add product',
      error: error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    await Product.update(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.delete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Order.updateStatus(req.params.id, status);

    res.json({
      success: true,
      message: 'Order status updated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();

    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    console.log('Fetching dashboard stats...');
    
    // Total revenue
    const [revenueResult] = await db.execute(
      'SELECT SUM(total_amount) AS total_revenue FROM orders WHERE order_status != "Cancelled"'
    );
    
    // Total orders
    const [ordersResult] = await db.execute(
      'SELECT COUNT(*) AS total_orders FROM orders'
    );
    
    // Total users
    const [usersResult] = await db.execute(
      'SELECT COUNT(*) AS total_users FROM users WHERE role = "customer"'
    );
    
    // Total products
    const [productsResult] = await db.execute(
      'SELECT COUNT(*) AS total_products FROM products'
    );

    // Low stock products
    const lowStock = await Product.getLowStock(50);

    // Top selling products
    const topSelling = await Product.getTopSelling(5);

    // Monthly revenue
    const [monthlyRevenue] = await db.execute(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total_amount) AS revenue
       FROM orders 
       WHERE order_status != 'Cancelled'
       GROUP BY DATE_FORMAT(created_at, '%Y-%m')
       ORDER BY month DESC
       LIMIT 6`
    );

    const stats = {
      totalRevenue: revenueResult[0].total_revenue || 0,
      totalOrders: ordersResult[0].total_orders,
      totalUsers: usersResult[0].total_users,
      totalProducts: productsResult[0].total_products,
      lowStockCount: lowStock.length
    };

    console.log('Dashboard stats:', stats);

    res.json({
      success: true,
      stats,
      lowStock,
      topSelling,
      monthlyRevenue
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};
