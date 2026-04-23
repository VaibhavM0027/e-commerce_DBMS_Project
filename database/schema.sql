-- ============================================
-- E-COMMERCE DATABASE SCHEMA
-- ============================================

CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password_hash VARCHAR(255) NOT NULL,
    address TEXT,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 3. PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_price (price),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 4. CART TABLE
-- ============================================
CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 5. CART ITEMS TABLE
-- ============================================
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_product (cart_id, product_id),
    INDEX idx_cart (cart_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 6. ORDERS TABLE
-- ============================================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    order_status ENUM('Pending', 'Packed', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (order_status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 7. ORDER ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 8. PAYMENTS TABLE
-- ============================================
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('Pending', 'Success', 'Failed') DEFAULT 'Pending',
    transaction_ref VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_status (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 9. WISHLIST TABLE
-- ============================================
CREATE TABLE wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id),
    INDEX idx_user (user_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- 10. REVIEWS TABLE
-- ============================================
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TRIGGER: Auto-reduce stock when order is placed
-- ============================================
DELIMITER $$
CREATE TRIGGER reduce_stock_after_order
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE product_id = NEW.product_id;
END$$
DELIMITER ;

-- ============================================
-- VIEW: Top selling products
-- ============================================
CREATE VIEW top_selling_products AS
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
ORDER BY total_sold DESC;

-- ============================================
-- STORED PROCEDURE: Place order
-- ============================================
DELIMITER $$
CREATE PROCEDURE place_order(
    IN p_user_id INT,
    IN p_payment_method VARCHAR(50),
    IN p_shipping_address TEXT,
    OUT p_order_id INT
)
BEGIN
    DECLARE v_total_amount DECIMAL(10, 2);
    DECLARE v_cart_id INT;
    
    -- Get user's cart
    SELECT cart_id INTO v_cart_id FROM cart WHERE user_id = p_user_id;
    
    -- Calculate total
    SELECT SUM(ci.quantity * p.price) INTO v_total_amount
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.product_id
    WHERE ci.cart_id = v_cart_id;
    
    -- Create order
    INSERT INTO orders (user_id, total_amount, payment_method, shipping_address)
    VALUES (p_user_id, v_total_amount, p_payment_method, p_shipping_address);
    
    SET p_order_id = LAST_INSERT_ID();
    
    -- Insert order items
    INSERT INTO order_items (order_id, product_id, quantity, price)
    SELECT p_order_id, ci.product_id, ci.quantity, p.price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.product_id
    WHERE ci.cart_id = v_cart_id;
    
    -- Clear cart
    DELETE FROM cart_items WHERE cart_id = v_cart_id;
    
    -- Create payment record
    INSERT INTO payments (order_id, amount, payment_status, transaction_ref)
    VALUES (p_order_id, v_total_amount, 'Success', CONCAT('TXN', p_order_id, UNIX_TIMESTAMP()));
END$$
DELIMITER ;
