const db = require('../config/database');

class Review {
  // Create review
  static async create(reviewData) {
    const { user_id, product_id, rating, comment } = reviewData;
    
    const [result] = await db.execute(
      'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
      [user_id, product_id, rating, comment]
    );
    
    // Update product rating
    await this.updateProductRating(product_id);
    
    return result.insertId;
  }

  // Get reviews for a product
  static async getByProduct(productId) {
    const [rows] = await db.execute(
      `SELECT r.*, u.full_name
       FROM reviews r
       JOIN users u ON r.user_id = u.user_id
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC`,
      [productId]
    );
    return rows;
  }

  // Update product average rating
  static async updateProductRating(productId) {
    const [rows] = await db.execute(
      'SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id = ?',
      [productId]
    );
    
    const avgRating = rows[0].avg_rating || 0;
    
    await db.execute(
      'UPDATE products SET rating = ? WHERE product_id = ?',
      [avgRating, productId]
    );
  }
}

module.exports = Review;
