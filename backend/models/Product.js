const db = require('../config/database');

class Product {
  // Get all products with filters
  static async getAll(filters = {}) {
    let query = `
      SELECT p.*, c.category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE 1=1
    `;
    let params = [];

    if (filters.category_id) {
      query += ' AND p.category_id = ?';
      params.push(filters.category_id);
    }

    if (filters.search) {
      query += ' AND (p.product_name LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm);
    }

    if (filters.minPrice) {
      query += ' AND p.price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice) {
      query += ' AND p.price <= ?';
      params.push(filters.maxPrice);
    }

    // Sorting
    if (filters.sortBy === 'price_asc') {
      query += ' ORDER BY p.price ASC';
    } else if (filters.sortBy === 'price_desc') {
      query += ' ORDER BY p.price DESC';
    } else if (filters.sortBy === 'rating') {
      query += ' ORDER BY p.rating DESC';
    } else {
      query += ' ORDER BY p.created_at DESC';
    }

    const [rows] = await db.execute(query, params);
    return rows;
  }

  // Get product by ID
  static async findById(productId) {
    const [rows] = await db.execute(
      `SELECT p.*, c.category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.category_id 
       WHERE p.product_id = ?`,
      [productId]
    );
    return rows[0];
  }

  // Create product (admin)
  static async create(productData) {
    const { category_id, product_name, description, price, stock, image_url, rating = 0 } = productData;
    
    const [result] = await db.execute(
      'INSERT INTO products (category_id, product_name, description, price, stock, image_url, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [category_id, product_name, description, price, stock, image_url, rating]
    );
    
    return result.insertId;
  }

  // Update product (admin)
  static async update(productId, productData) {
    const { category_id, product_name, description, price, stock, image_url, rating } = productData;
    
    await db.execute(
      'UPDATE products SET category_id = ?, product_name = ?, description = ?, price = ?, stock = ?, image_url = ?, rating = ? WHERE product_id = ?',
      [category_id, product_name, description, price, stock, image_url, rating, productId]
    );
    
    return true;
  }

  // Delete product (admin)
  static async delete(productId) {
    await db.execute('DELETE FROM products WHERE product_id = ?', [productId]);
    return true;
  }

  // Get low stock products
  static async getLowStock(threshold = 50) {
    const [rows] = await db.execute(
      'SELECT * FROM products WHERE stock < ? ORDER BY stock ASC',
      [threshold]
    );
    return rows;
  }

  // Get top selling products
  static async getTopSelling(limit = 10) {
    const [rows] = await db.execute(
      `SELECT * FROM top_selling_products LIMIT ${parseInt(limit)}`
    );
    return rows;
  }
}

module.exports = Product;
