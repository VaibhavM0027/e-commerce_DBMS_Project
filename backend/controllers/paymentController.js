const Order = require('../models/Order');
const db = require('../config/database');

// Create payment
exports.createPayment = async (req, res) => {
  try {
    const { order_id, amount, payment_method } = req.body;

    const transactionRef = `TXN${order_id}${Date.now()}`;
    
    const paymentId = await Order.createPayment({
      order_id,
      amount,
      payment_status: 'Success',
      transaction_ref: transactionRef
    });

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      paymentId,
      transactionRef
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Payment failed',
      error: error.message
    });
  }
};

// Get payment by order
exports.getPaymentByOrder = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM payments WHERE order_id = ?',
      [req.params.orderId]
    );

    res.json({
      success: true,
      payment: rows[0] || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment',
      error: error.message
    });
  }
};
