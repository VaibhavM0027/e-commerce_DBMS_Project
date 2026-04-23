const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create new user
  static async create(userData) {
    const { full_name, email, phone, password, address, role = 'customer' } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    const [result] = await db.execute(
      'INSERT INTO users (full_name, email, phone, password_hash, address, role) VALUES (?, ?, ?, ?, ?, ?)',
      [full_name, email, phone, password_hash, address, role]
    );
    
    return result.insertId;
  }

  // Find user by email
  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Find user by ID
  static async findById(userId) {
    const [rows] = await db.execute(
      'SELECT user_id, full_name, email, phone, address, role, created_at FROM users WHERE user_id = ?',
      [userId]
    );
    return rows[0];
  }

  // Update user profile
  static async update(userId, userData) {
    const { full_name, phone, address } = userData;
    
    await db.execute(
      'UPDATE users SET full_name = ?, phone = ?, address = ? WHERE user_id = ?',
      [full_name, phone, address, userId]
    );
    
    return true;
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Get all users (admin)
  static async getAll() {
    const [rows] = await db.execute(
      'SELECT user_id, full_name, email, phone, address, role, created_at FROM users ORDER BY created_at DESC'
    );
    return rows;
  }
}

module.exports = User;
