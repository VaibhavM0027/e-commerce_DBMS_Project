-- ============================================
-- SAMPLE DATA FOR E-COMMERCE DATABASE
-- ============================================

USE ecommerce_db;

-- ============================================
-- 1. INSERT CATEGORIES
-- ============================================
INSERT INTO categories (category_name) VALUES
('Electronics'),
('Fashion'),
('Home & Kitchen'),
('Books'),
('Sports'),
('Toys & Games'),
('Beauty'),
('Grocery');

-- ============================================
-- 2. INSERT USERS (password for all: "password123")
-- ============================================
INSERT INTO users (full_name, email, phone, password_hash, address, role) VALUES
('Admin User', 'admin@ecommerce.com', '9876543210', '$2b$10$rHkGBJzYp3MqJLlqYqJlGOwEj5K5vQq8F0ZqYqJlqYqJlqYqJlqY.', 'Admin Office, Tech Park', 'admin'),
('John Doe', 'john@example.com', '9876543211', '$2b$10$rHkGBJzYp3MqJLlqYqJlGOwEj5K5vQq8F0ZqYqJlqYqJlqYqJlqY.', '123 Main Street, New York', 'customer'),
('Jane Smith', 'jane@example.com', '9876543212', '$2b$10$rHkGBJzYp3MqJLlqYqJlGOwEj5K5vQq8F0ZqYqJlqYqJlqYqJlqY.', '456 Park Avenue, Los Angeles', 'customer'),
('Mike Johnson', 'mike@example.com', '9876543213', '$2b$10$rHkGBJzYp3MqJLlqYqJlGOwEj5K5vQq8F0ZqYqJlqYqJlqYqJlqY.', '789 Oak Drive, Chicago', 'customer'),
('Sarah Williams', 'sarah@example.com', '9876543214', '$2b$10$rHkGBJzYp3MqJLlqYqJlGOwEj5K5vQq8F0ZqYqJlqYqJlqYqJlqY.', '321 Pine Road, Houston', 'customer');

-- ============================================
-- 3. INSERT PRODUCTS
-- ============================================
INSERT INTO products (category_id, product_name, description, price, stock, image_url, rating) VALUES
-- Electronics
(1, 'Wireless Bluetooth Headphones', 'Premium quality wireless headphones with noise cancellation', 2999.99, 150, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 4.5),
(1, 'Smartphone 5G', 'Latest 5G smartphone with 128GB storage and triple camera', 39999.99, 75, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 4.7),
(1, 'Laptop Pro 15"', 'Powerful laptop with 16GB RAM and 512GB SSD', 89999.99, 50, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', 4.8),
(1, 'Smart Watch', 'Feature-rich smartwatch with fitness tracking', 9999.99, 200, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', 4.3),
(1, 'Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 999.99, 300, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', 4.2),

-- Fashion
(2, 'Men Casual Shirt', 'Comfortable cotton casual shirt for everyday wear', 1299.99, 250, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500', 4.1),
(2, 'Women Summer Dress', 'Elegant summer dress with floral pattern', 1999.99, 180, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', 4.6),
(2, 'Running Shoes', 'Lightweight running shoes with superior cushioning', 3499.99, 120, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 4.7),
(2, 'Leather Wallet', 'Genuine leather wallet with multiple card slots', 899.99, 400, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500', 4.4),
(2, 'Sunglasses Premium', 'UV protection sunglasses with polarized lenses', 2499.99, 220, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500', 4.5),

-- Home & Kitchen
(3, 'Coffee Maker', 'Automatic coffee maker with programmable settings', 4999.99, 90, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500', 4.6),
(3, 'Blender Pro', 'High-speed blender for smoothies and soups', 3499.99, 110, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500', 4.4),
(3, 'Cookware Set', 'Complete stainless steel cookware set - 10 pieces', 7999.99, 60, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', 4.8),
(3, 'Air Purifier', 'HEPA air purifier for large rooms', 8999.99, 70, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500', 4.5),
(3, 'Vacuum Cleaner', 'Cordless vacuum cleaner with powerful suction', 12999.99, 55, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500', 4.7),

-- Books
(4, 'The Great Adventure', 'Bestselling fiction novel about an epic journey', 499.99, 500, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', 4.3),
(4, 'Learn Programming', 'Complete guide to modern programming languages', 799.99, 350, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500', 4.6),
(4, 'History of Science', 'Comprehensive overview of scientific discoveries', 599.99, 280, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500', 4.4),
(4, 'Cooking Mastery', 'Master chef recipes for home cooking', 699.99, 320, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500', 4.7),

-- Sports
(5, 'Yoga Mat Premium', 'Non-slip yoga mat with carrying strap', 1499.99, 200, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500', 4.5),
(5, 'Dumbbells Set', 'Adjustable dumbbells set 5-25 kg', 5999.99, 80, 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500', 4.6),
(5, 'Cricket Bat', 'Professional grade cricket bat willow wood', 3999.99, 100, 'https://images.unsplash.com/photo-1624523278528-375edba943a0?w=500', 4.4),

-- Toys & Games
(6, 'Building Blocks Set', 'Creative building blocks for kids 500 pieces', 1999.99, 250, 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500', 4.8),
(6, 'Board Games Collection', 'Classic board games family pack', 1499.99, 180, 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=500', 4.5),
(6, 'Remote Control Car', 'High-speed RC car with rechargeable battery', 2999.99, 120, 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500', 4.6),

-- Beauty
(7, 'Skincare Set', 'Complete skincare routine set with natural ingredients', 2499.99, 220, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500', 4.7),
(7, 'Perfume Premium', 'Luxury perfume with long-lasting fragrance', 3999.99, 150, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500', 4.8),
(7, 'Hair Dryer Pro', 'Professional salon hair dryer with ionic technology', 2999.99, 130, 'https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=500&q=80', 4.5),

-- Grocery
(8, 'Organic Honey', 'Pure organic honey 1kg jar', 599.99, 400, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500', 4.6),
(8, 'Green Tea Collection', 'Premium green tea variety pack 100 bags', 799.99, 350, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500', 4.4),
(8, 'Mixed Nuts Premium', 'Assorted premium nuts 500g pack', 899.99, 280, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500', 4.7);

-- ============================================
-- 4. INSERT SAMPLE CARTS
-- ============================================
INSERT INTO cart (user_id) VALUES
(2),
(3),
(4),
(5);

-- ============================================
-- 5. INSERT SAMPLE CART ITEMS
-- ============================================
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 1, 1),
(1, 5, 2),
(1, 12, 1),
(2, 3, 1),
(2, 8, 2),
(3, 15, 1),
(3, 20, 3);

-- ============================================
-- 6. INSERT SAMPLE ORDERS
-- ============================================
INSERT INTO orders (user_id, total_amount, payment_method, order_status, shipping_address) VALUES
(2, 4999.98, 'Credit Card', 'Delivered', '123 Main Street, New York'),
(2, 12999.99, 'UPI', 'Shipped', '123 Main Street, New York'),
(3, 2999.99, 'Debit Card', 'Packed', '456 Park Avenue, Los Angeles'),
(3, 8499.97, 'Credit Card', 'Pending', '456 Park Avenue, Los Angeles'),
(4, 5999.99, 'Net Banking', 'Delivered', '789 Oak Drive, Chicago');

-- ============================================
-- 7. INSERT SAMPLE ORDER ITEMS
-- ============================================
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 2999.99),
(1, 5, 2, 999.99),
(2, 11, 1, 12999.99),
(3, 2, 1, 39999.99),
(4, 13, 1, 4999.99),
(4, 14, 1, 3499.99),
(5, 17, 1, 5999.99);

-- ============================================
-- 8. INSERT SAMPLE PAYMENTS
-- ============================================
INSERT INTO payments (order_id, amount, payment_status, transaction_ref) VALUES
(1, 4999.98, 'Success', 'TXN1001'),
(2, 12999.99, 'Success', 'TXN1002'),
(3, 2999.99, 'Pending', 'TXN1003'),
(4, 8499.97, 'Success', 'TXN1004'),
(5, 5999.99, 'Success', 'TXN1005');

-- ============================================
-- 9. INSERT SAMPLE WISHLIST
-- ============================================
INSERT INTO wishlist (user_id, product_id) VALUES
(2, 3),
(2, 7),
(2, 11),
(3, 1),
(3, 5),
(4, 9),
(4, 15);

-- ============================================
-- 10. INSERT SAMPLE REVIEWS
-- ============================================
INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
(2, 1, 5, 'Excellent sound quality! Best headphones I have ever used.'),
(2, 5, 4, 'Good wireless mouse, comfortable grip.'),
(3, 2, 5, 'Amazing smartphone, camera is superb!'),
(3, 3, 4, 'Great laptop for work and gaming.'),
(4, 8, 5, 'Beautiful dress, fits perfectly!'),
(4, 13, 4, 'Makes perfect coffee every morning.'),
(5, 11, 5, 'Top quality vacuum cleaner, worth the price.'),
(5, 17, 4, 'Great book for beginners in programming.');
