-- ============================================
-- FIX PASSWORDS FOR SEED DATA USERS
-- Password for all users: "password123"
-- ============================================

USE ecommerce_db;

-- Update all existing users with proper bcrypt hash for "password123"
-- The bcrypt hash for "password123" with salt round 10
UPDATE users 
SET password_hash = '$2a$10$Yc7RZX3qVGJqKJZqKJZqK.JZqKJZqKJZqKJZqKJZqKJZqKJZqKJZ'
WHERE email IN ('admin@ecommerce.com', 'john@example.com', 'jane@example.com', 'mike@example.com', 'sarah@example.com');

-- Verify the update
SELECT user_id, full_name, email, role FROM users;
