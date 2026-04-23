const db = require('../config/database');

class Order {
  // Create order
  static async create(orderData) {
    const { user_id, total_amount, payment_method, shipping_address } = orderData;
    
    const [result] = await db.execute(
      'INSERT INTO orders (user_id, total_amount, payment_method, shipping_address) VALUES (?, ?, ?, ?)',
      [user_id, total_amount, payment_method, shipping_address]
    );
    
    return result.insertId;
  }

  // Add order items
  static async addOrderItems(orderId, items) {
    for (const item of items) {
      await db.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }
    return true;
  }

  // Get user orders
  static async getUserOrders(userId) {
    const [rows] = await db.execute(
      `SELECT o.*, COUNT(oi.order_item_id) AS item_count
       FROM orders o
       LEFT JOIN order_items oi ON o.order_id = oi.order_id
       WHERE o.user_id = ?
       GROUP BY o.order_id
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return rows;
  }

  // Get order details
  static async getOrderDetails(orderId) {
    const [orderRows] = await db.execute(
      `SELECT o.*, u.full_name, u.email, u.phone
       FROM orders o
       JOIN users u ON o.user_id = u.user_id
       WHERE o.order_id = ?`,
      [orderId]
    );

    if (orderRows.length === 0) return null;

    const [itemsRows] = await db.execute(
      `SELECT oi.*, p.product_name, p.image_url
       FROM order_items oi
       JOIN products p ON oi.product_id = p.product_id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    return {
      ...orderRows[0],
      items: itemsRows
    };
  }

  // Get all orders (admin)
  static async getAllOrders() {
    const [rows] = await db.execute(
      `SELECT o.*, u.full_name AS customer_name, u.email AS customer_email
       FROM orders o
       JOIN users u ON o.user_id = u.user_id
       ORDER BY o.created_at DESC`
    );
    return rows;
  }

  // Update order status
  static async updateStatus(orderId, status) {
    await db.execute(
      'UPDATE orders SET order_status = ? WHERE order_id = ?',
      [status, orderId]
    );
    return true;
  }

  // Create payment record
  static async createPayment(paymentData) {
    const { order_id, amount, payment_status, transaction_ref } = paymentData;
    
    const [result] = await db.execute(
      'INSERT INTO payments (order_id, amount, payment_status, transaction_ref) VALUES (?, ?, ?, ?)',
      [order_id, amount, payment_status, transaction_ref]
    );
    
    return result.insertId;
  }
}

module.exports = Order;
