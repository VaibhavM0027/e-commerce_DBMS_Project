const Order = require('../models/Order');
const Cart = require('../models/Cart');
const db = require('../config/database');

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const { payment_method, shipping_address } = req.body;
    const userId = req.user.userId;

    // Get cart
    const cartId = await Cart.getOrCreateCart(userId);
    const cartItems = await Cart.getCartItems(cartId);

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const orderId = await Order.create({
      user_id: userId,
      total_amount: totalAmount,
      payment_method,
      shipping_address
    });

    // Add order items (trigger will reduce stock)
    await Order.addOrderItems(orderId, cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    })));

    // Create payment
    const transactionRef = `TXN${orderId}${Date.now()}`;
    await Order.createPayment({
      order_id: orderId,
      amount: totalAmount,
      payment_status: 'Success',
      transaction_ref: transactionRef
    });

    // Clear cart
    await Cart.clearCart(cartId);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message
    });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.getUserOrders(req.user.userId);

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

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.getOrderDetails(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user_id !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};
