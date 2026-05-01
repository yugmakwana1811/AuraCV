# =====================================================
# DATABASE MODULE
# Student Report Card System
# CBSE Class 12 IP Project
# =====================================================

import mysql.connector
from mysql.connector import Error

# =====================================================
# CONFIGURATION
# =====================================================
HOST = 'localhost'
PORT = 3306
USER = 'root'
PASSWORD = ''  # Update with your MySQL password
DATABASE = 'school_db'


def get_connection():
    """
    Returns a MySQL database connection.
    Update CONFIG values with your MySQL credentials.
    """
    try:
        connection = mysql.connector.connect(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASSWORD,
            database=DATABASE
        )
        return connection
    except Error as e:
        print(f"[ERROR] Unable to connect to MySQL: {e}")
        return None


def create_database():
    """
    Creates the school_db database and all required tables.
    Run this once before using the application.
    """
    try:
        # Connect without specifying database first
        connection = mysql.connector.connect(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASSWORD
        )
        cursor = connection.cursor()

        # Create database
        cursor.execute("CREATE DATABASE IF NOT EXISTS school_db")
        cursor.execute("USE school_db")

        # Create students table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS students (
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
            )
        """)

        # Create login table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_login (
                username VARCHAR(50) PRIMARY KEY,
                password VARCHAR(100) NOT NULL
            )
        """)

        # Insert default admin if not exists
        cursor.execute("""
            INSERT IGNORE INTO user_login (username, password)
            VALUES ('admin', 'admin')
        """)

        connection.commit()
        cursor.close()
        connection.close()
        print("[SUCCESS] Database and tables created successfully!")
        return True

    except Error as e:
        print(f"[ERROR] Failed to create database: {e}")
        return False


def verify_login(username, password):
    """
    Verifies user credentials from the login table.
    Returns True if valid, False otherwise.
    """
    try:
        connection = get_connection()
        if connection is None:
            return False

        cursor = connection.cursor()
        cursor.execute("""
            SELECT * FROM user_login
            WHERE username = %s AND password = %s
        """, (username, password))

        result = cursor.fetchone()
        cursor.close()
        connection.close()

        return result is not None

    except Error as e:
        print(f"[ERROR] Login verification failed: {e}")
        return False


# =====================================================
# TEST FUNCTION
# =====================================================
if __name__ == "__main__":
    print("Testing Database Module...")
    print("-" * 50)

    # Test database creation
    print("Creating database...")
    create_database()

    # Test connection
    print("Testing connection...")
    conn = get_connection()
    if conn:
        print("[SUCCESS] Connected to database!")
        conn.close()
    else:
        print("[FAILED] Could not connect to database.")
