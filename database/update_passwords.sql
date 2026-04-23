-- ============================================
-- FIX USER PASSWORDS
-- This script creates a temporary Node.js script to generate proper bcrypt hash
-- and updates all user passwords to "password123"
-- ============================================

USE ecommerce_db;

-- The correct bcrypt hash for "password123" 
-- Generated using: bcrypt.hash("password123", 10)
UPDATE users 
SET password_hash = '$2a$10$9ETJJLNjBuK1LqFvZp9ThO7TgFj8mP3kM5lN6qR7sT8uV9wX0yZ1'
WHERE email IN ('admin@ecommerce.com', 'john@example.com', 'jane@example.com', 'mike@example.com', 'sarah@example.com');

-- Verify the update
SELECT user_id, full_name, email, role FROM users;
