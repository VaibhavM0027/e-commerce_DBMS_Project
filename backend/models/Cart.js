const db = require('../config/database');

class Cart {
  // Get or create cart for user
  static async getOrCreateCart(userId) {
    let [rows] = await db.execute('SELECT cart_id FROM cart WHERE user_id = ?', [userId]);
    
    if (rows.length === 0) {
      const [result] = await db.execute('INSERT INTO cart (user_id) VALUES (?)', [userId]);
      return result.insertId;
    }
    
    return rows[0].cart_id;
  }

  // Get cart items
  static async getCartItems(cartId) {
    const [rows] = await db.execute(
      `SELECT ci.cart_item_id, ci.quantity, p.product_id, p.product_name, p.price, p.image_url, p.stock
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = ?`,
      [cartId]
    );
    return rows;
  }

  // Add item to cart
  static async addItem(cartId, productId, quantity = 1) {
    await db.execute(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
      [cartId, productId, quantity, quantity]
    );
    return true;
  }

  // Update cart item quantity
  static async updateQuantity(cartItemId, quantity) {
    await db.execute(
      'UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?',
      [quantity, cartItemId]
    );
    return true;
  }

  // Remove item from cart
  static async removeItem(cartItemId) {
    await db.execute('DELETE FROM cart_items WHERE cart_item_id = ?', [cartItemId]);
    return true;
  }

  // Clear cart
  static async clearCart(cartId) {
    await db.execute('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    return true;
  }
}

module.exports = Cart;
