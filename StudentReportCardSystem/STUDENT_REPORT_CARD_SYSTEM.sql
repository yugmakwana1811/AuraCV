-- =====================================================
-- STUDENT REPORT CARD SYSTEM
-- CBSE Class 12 IP Project
-- Database Setup Script
-- =====================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

-- Drop tables if exist (for fresh setup)
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS user_login;

-- Create Students Table
CREATE TABLE students (
    roll_no VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(20) NOT NULL,
    section VARCHAR(5) NOT NULL,
    physics_marks INT DEFAULT 0,
    chemistry_marks INT DEFAULT 0,
    maths_marks INT DEFAULT 0,
    computer_marks INT DEFAULT 0,
    english_marks INT DEFAULT 0,
    total_marks INT DEFAULT 0,
    percentage FLOAT DEFAULT 0.0,
    grade VARCHAR(5) DEFAULT 'N'
);

-- Create Login Table
CREATE TABLE user_login (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);

-- Insert Default Admin User (password: admin)
INSERT INTO user_login (username, password) VALUES ('admin', 'admin');

-- =====================================================
-- Sample Data for Testing
-- =====================================================
INSERT INTO students (roll_no, name, class, section, physics_marks, chemistry_marks, maths_marks, computer_marks, english_marks, total_marks, percentage, grade)
VALUES
('101', 'Rahul Sharma', '12', 'A', 85, 78, 92, 88, 76, 419, 83.8, 'A'),
('102', 'Priya Patel', '12', 'A', 91, 85, 78, 94, 82, 430, 86.0, 'A'),
('103', 'Amit Kumar', '12', 'B', 65, 72, 58, 70, 68, 333, 66.6, 'B'),
('104', 'Sneha Gupta', '12', 'B', 88, 92, 85, 90, 87, 442, 88.4, 'A'),
('105', 'Vikram Singh', '12', 'A', 55, 48, 62, 58, 65, 288, 57.6, 'C');

-- =====================================================
-- Stored Procedure: Add Student
-- =====================================================
DELIMITER //
CREATE PROCEDURE add_student(
    IN p_roll_no VARCHAR(20),
    IN p_name VARCHAR(100),
    IN p_class VARCHAR(20),
    IN p_section VARCHAR(5),
    IN p_physics INT,
    IN p_chemistry INT,
    IN p_maths INT,
    IN p_computer INT,
    IN p_english INT
)
BEGIN
    DECLARE v_total INT;
    DECLARE v_percentage FLOAT;
    DECLARE v_grade VARCHAR(5);

    SET v_total = p_physics + p_chemistry + p_maths + p_computer + p_english;
    SET v_percentage = v_total / 5.0;

    IF v_percentage >= 90 THEN SET v_grade = 'A1';
    ELSEIF v_percentage >= 80 THEN SET v_grade = 'A2';
    ELSEIF v_percentage >= 70 THEN SET v_grade = 'B1';
    ELSEIF v_percentage >= 60 THEN SET v_grade = 'B2';
    ELSEIF v_percentage >= 50 THEN SET v_grade = 'C1';
    ELSEIF v_percentage >= 40 THEN SET v_grade = 'C2';
    ELSEIF v_percentage >= 32 THEN SET v_grade = 'D';
    ELSE SET v_grade = 'E';
    END IF;

    INSERT INTO students (roll_no, name, class, section, physics_marks, chemistry_marks, maths_marks, computer_marks, english_marks, total_marks, percentage, grade)
    VALUES (p_roll_no, p_name, p_class, p_section, p_physics, p_chemistry, p_maths, p_computer, p_english, v_total, v_percentage, v_grade);
END //
DELIMITER ;

-- =====================================================
-- Stored Procedure: Update Student Marks
-- =====================================================
DELIMITER //
CREATE PROCEDURE update_student_marks(
    IN p_roll_no VARCHAR(20),
    IN p_physics INT,
    IN p_chemistry INT,
    IN p_maths INT,
    IN p_computer INT,
    IN p_english INT
)
BEGIN
    DECLARE v_total INT;
    DECLARE v_percentage FLOAT;
    DECLARE v_grade VARCHAR(5);

    SET v_total = p_physics + p_chemistry + p_maths + p_computer + p_english;
    SET v_percentage = v_total / 5.0;

    IF v_percentage >= 90 THEN SET v_grade = 'A1';
    ELSEIF v_percentage >= 80 THEN SET v_grade = 'A2';
    ELSEIF v_percentage >= 70 THEN SET v_grade = 'B1';
    ELSEIF v_percentage >= 60 THEN SET v_grade = 'B2';
    ELSEIF v_percentage >= 50 THEN SET v_grade = 'C1';
    ELSEIF v_percentage >= 40 THEN SET v_grade = 'C2';
    ELSEIF v_percentage >= 32 THEN SET v_grade = 'D';
    ELSE SET v_grade = 'E';
    END IF;

    UPDATE students
    SET physics_marks = p_physics,
        chemistry_marks = p_chemistry,
        maths_marks = p_maths,
        computer_marks = p_computer,
        english_marks = p_english,
        total_marks = v_total,
        percentage = v_percentage,
        grade = v_grade
    WHERE roll_no = p_roll_no;
END //
DELIMITER ;

-- =====================================================
-- View: Student Results Summary
-- =====================================================
CREATE VIEW student_results_summary AS
SELECT
    roll_no,
    name,
    class,
    section,
    physics_marks,
    chemistry_marks,
    maths_marks,
    computer_marks,
    english_marks,
    total_marks,
    percentage,
    grade,
    CASE
        WHEN percentage >= 90 THEN 'Outstanding'
        WHEN percentage >= 80 THEN 'Excellent'
        WHEN percentage >= 70 THEN 'Very Good'
        WHEN percentage >= 60 THEN 'Good'
        WHEN percentage >= 50 THEN 'Fair'
        WHEN percentage >= 40 THEN 'Poor'
        ELSE 'Needs Improvement'
    END AS performance
FROM students;

-- =====================================================
-- View: Class Performance Analysis
-- =====================================================
CREATE VIEW class_performance AS
SELECT
    class,
    section,
    COUNT(*) AS total_students,
    AVG(percentage) AS avg_percentage,
    MAX(percentage) AS highest_percentage,
    MIN(percentage) AS lowest_percentage,
    AVG(physics_marks) AS avg_physics,
    AVG(chemistry_marks) AS avg_chemistry,
    AVG(maths_marks) AS avg_maths,
    AVG(computer_marks) AS avg_computer,
    AVG(english_marks) AS avg_english
FROM students
GROUP BY class, section;
