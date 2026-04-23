const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

async function updatePasswords() {
  try {
    // Generate bcrypt hash for "password123"
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    console.log('Generated password hash:', passwordHash);
    
    // Update all users
    const [result] = await promisePool.execute(
      `UPDATE users SET password_hash = ? 
       WHERE email IN ('admin@ecommerce.com', 'john@example.com', 'jane@example.com', 'mike@example.com', 'sarah@example.com')`,
      [passwordHash]
    );
    
    console.log(`Updated ${result.affectedRows} users`);
    console.log('All users now have password: password123');
    
    // Verify the update
    const [users] = await promisePool.execute(
      'SELECT user_id, full_name, email, role FROM users'
    );
    
    console.log('\nUsers in database:');
    console.table(users);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    pool.end();
  }
}

updatePasswords();
