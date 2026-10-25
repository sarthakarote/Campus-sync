CREATE DATABASE IF NOT EXISTS campus_sync;
USE campus_sync;

-- 1. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'FACULTY', 'OFFICE_ADMIN', 'CANTEEN_ADMIN') NOT NULL,
    college_name VARCHAR(150) DEFAULT 'Don Bosco Institute Of Technology, Kurla',
    branch VARCHAR(100),
    year_of_study ENUM('FE', 'SE', 'TE', 'BE'),
    is_blacklisted TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Complaints Table
CREATE TABLE complaints (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    upvotes INT DEFAULT 1,
    status ENUM('OPEN', 'IN_PROGRESS', 'SOLVED') DEFAULT 'OPEN',
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Upvote Tracking Table (1 user = 1 vote)
CREATE TABLE complaint_upvotes (
    complaint_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (complaint_id, user_id),
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Campus Mart Table
CREATE TABLE mart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    type ENUM('SELL', 'LEND') NOT NULL,
    price VARCHAR(50) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    seller_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Lost & Found Table
CREATE TABLE lost_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    location_found VARCHAR(150) NOT NULL,
    claimer_id BIGINT DEFAULT NULL,
    status ENUM('AVAILABLE', 'READY_TO_HANDOVER', 'CLAIMED') DEFAULT 'AVAILABLE',
    posted_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (claimer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. Canteen Menu & Orders Table
CREATE TABLE canteen_menu (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category ENUM('BREAKFAST', 'SANDWICHES', 'SHAKES') NOT NULL,
    price DECIMAL(8,2) NOT NULL
);

CREATE TABLE canteen_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    status ENUM('PENDING', 'COMPLETED') DEFAULT 'PENDING',
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES canteen_menu(id) ON DELETE CASCADE
);

-- 6. Railway Concession Table
CREATE TABLE railway_concessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNIQUE NOT NULL,
    home_station VARCHAR(100) NOT NULL,
    travel_class ENUM('FIRST', 'SECOND') NOT NULL,
    tenure ENUM('MONTHLY', 'QUARTERLY') DEFAULT 'MONTHLY',
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert Initial Test Users
INSERT INTO users (name, email, password, role, branch, year_of_study) VALUES
('Aarav Patil', 'aarav@dbit.in', 'password123', 'STUDENT', 'Computer Engineering', 'SE'),
('Prof. Sharma', 'sharma@dbit.in', 'password123', 'FACULTY', 'Computer Engineering', NULL),
('Admin Officer', 'admin@dbit.in', 'password123', 'OFFICE_ADMIN', NULL, NULL),
('Cafe Bosco Manager', 'canteen@dbit.in', 'password123', 'CANTEEN_ADMIN', NULL, NULL);