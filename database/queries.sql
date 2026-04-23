-- ============================================
-- USEFUL QUERIES FOR E-COMMERCE DATABASE
-- ============================================

USE ecommerce_db;

-- ============================================
-- 1. Top 3 Selling Products
-- ============================================
SELECT 
    p.product_id,
    p.product_name,
    p.image_url,
    p.price,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.image_url, p.price
ORDER BY total_sold DESC
LIMIT 3;

-- ============================================
-- 2. Monthly Revenue
-- ============================================
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS monthly_revenue
FROM orders
WHERE order_status != 'Cancelled'
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- ============================================
-- 3. Users with Most Orders
-- ============================================
SELECT 
    u.user_id,
    u.full_name,
    u.email,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_spent
FROM users u
JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.full_name, u.email
ORDER BY total_orders DESC
LIMIT 10;

-- ============================================
-- 4. Products Low in Stock (less than 50 items)
-- ============================================
SELECT 
    product_id,
    product_name,
    category_id,
    price,
    stock,
    image_url
FROM products
WHERE stock < 50
ORDER BY stock ASC;

-- ============================================
-- 5. Products Never Ordered
-- ============================================
SELECT 
    p.product_id,
    p.product_name,
    p.price,
    p.stock,
    c.category_name
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
JOIN categories c ON p.category_id = c.category_id
WHERE oi.order_item_id IS NULL;

-- ============================================
-- 6. Highest Spending Customer
-- ============================================
SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.phone,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_spent
FROM users u
JOIN orders o ON u.user_id = o.user_id
WHERE o.order_status != 'Cancelled'
GROUP BY u.user_id, u.full_name, u.email, u.phone
ORDER BY total_spent DESC
LIMIT 1;

-- ============================================
-- 7. Orders Placed Today
-- ============================================
SELECT 
    o.order_id,
    u.full_name AS customer_name,
    u.email,
    o.total_amount,
    o.order_status,
    o.shipping_address,
    o.created_at
FROM orders o
JOIN users u ON o.user_id = u.user_id
WHERE DATE(o.created_at) = CURDATE()
ORDER BY o.created_at DESC;

-- ============================================
-- 8. Revenue by Category
-- ============================================
SELECT 
    c.category_name,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(oi.quantity) AS items_sold,
    SUM(oi.quantity * oi.price) AS category_revenue
FROM categories c
JOIN products p ON c.category_id = p.category_id
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_status != 'Cancelled'
GROUP BY c.category_name
ORDER BY category_revenue DESC;

-- ============================================
-- 9. Average Order Value
-- ============================================
SELECT 
    AVG(total_amount) AS avg_order_value,
    MIN(total_amount) AS min_order_value,
    MAX(total_amount) AS max_order_value
FROM orders
WHERE order_status != 'Cancelled';

-- ============================================
-- 10. User Activity Report
-- ============================================
SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.role,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COUNT(DISTINCT w.wishlist_id) AS wishlist_items,
    COUNT(DISTINCT r.review_id) AS reviews_written,
    MAX(o.created_at) AS last_order_date
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
LEFT JOIN wishlist w ON u.user_id = w.user_id
LEFT JOIN reviews r ON u.user_id = r.user_id
GROUP BY u.user_id, u.full_name, u.email, u.role
ORDER BY u.user_id;

-- ============================================
-- 11. Order Status Summary
-- ============================================
SELECT 
    order_status,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS total_value
FROM orders
GROUP BY order_status
ORDER BY total_orders DESC;

-- ============================================
-- 12. Products with Average Rating
-- ============================================
SELECT 
    p.product_id,
    p.product_name,
    p.price,
    p.rating AS stored_rating,
    AVG(r.rating) AS calculated_rating,
    COUNT(r.review_id) AS total_reviews
FROM products p
LEFT JOIN reviews r ON p.product_id = r.product_id
GROUP BY p.product_id, p.product_name, p.price, p.rating
ORDER BY calculated_rating DESC;
