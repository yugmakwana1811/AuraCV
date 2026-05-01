# =====================================================
# STUDENT REPORT CARD SYSTEM
# CBSE Class 12 IP Project
# Complete Documentation
# =====================================================

---

# TITLE PAGE

## STUDENT REPORT CARD SYSTEM

### CBSE Class 12 IP Project
#### Informatics Practices

---

**Academic Year:** 2025-2026

**Project Type:** Individual Project

**Guided by:** [Teacher Name]
**Subject:** Informatics Practices
**Class:** 12 - Commerce (IP)
**Name:** [Student Name]

---

# INDEX

| S.No | Content | Page No. |
|------|---------|----------|
| 1 | Title Page | 1 |
| 2 | Index | 2 |
| 3 | Acknowledgement | 3 |
| 4 | Project Analysis | 4 |
| 5 | Modules and Libraries Used | 5 |
| 6 | Functions Used | 6 |
| 7 | Hardware and Software Requirements | 7 |
| 8 | Working Description | 8 |
| 9 | Project Source Code | 10 |
| 10 | Output Screenshots | 25 |
| 11 | Bibliography | 30 |

---

# ACKNOWLEDGEMENT

I would like to express my sincere gratitude to our Principal ma'am **[Principal Name]** for providing the opportunity to undertake this project as part of the CBSE Class 12 curriculum.

I extend my heartfelt thanks to my subject teacher **[Teacher Name]** for their invaluable guidance, constant encouragement, and support throughout the development of this project. Their expertise in Informatics Practices has been instrumental in shaping this project.

I would also like to thank my parents for their unwavering support and motivation during the completion of this project.

Through this project, I have gained practical experience in Python programming, MySQL database management, and data visualization using Pandas and Matplotlib. This project has enhanced my understanding of how computers can be used to solve real-world problems efficiently.

---

# PROJECT ANALYSIS

## 1. Introduction

The **Student Report Card System** is a comprehensive menu-driven application designed to manage student academic records for CBSE Class 12. The system provides a complete solution for storing, retrieving, updating, and analyzing student performance data.

## 2. Purpose

The main objectives of this project are:

- **Data Management:** Efficient storage and retrieval of student records
- **Result Calculation:** Automatic calculation of total marks, percentage, and grades
- **Report Generation:** Create formatted report cards for individual students
- **Data Visualization:** Generate charts for class performance analysis
- **User Authentication:** Secure login system for authorized access

## 3. Features

### Core Features
- Add new student records with marks in 5 subjects
- Search student records by roll number
- Update existing student information and marks
- Delete student records
- Display all students or filter by class
- Generate individual report cards as text files
- Generate class performance charts (Bar, Pie, Histogram)

### Technical Features
- MySQL database backend for persistent storage
- Pandas library for data manipulation and display
- Matplotlib library for data visualization
- Menu-driven interface with clear user prompts
- Input validation for marks (0-100 range)
- Automatic grade calculation as per CBSE norms

## 4. Database Design

### Students Table
| Column | Type | Description |
|--------|------|-------------|
| roll_no | VARCHAR(20) | Primary Key |
| name | VARCHAR(100) | Student name |
| class | VARCHAR(20) | Class (e.g., 12) |
| section | VARCHAR(5) | Section (e.g., A) |
| physics_marks | INT | Physics marks (0-100) |
| chemistry_marks | INT | Chemistry marks (0-100) |
| maths_marks | INT | Mathematics marks (0-100) |
| computer_marks | INT | Computer marks (0-100) |
| english_marks | INT | English marks (0-100) |
| total_marks | INT | Calculated total (0-500) |
| percentage | FLOAT | Calculated percentage |
| grade | VARCHAR(5) | CBSE Grade |

### User Login Table
| Column | Type | Description |
|--------|------|-------------|
| username | VARCHAR(50) | Primary Key |
| password | VARCHAR(100) | User password |

## 5. Grade System (CBSE Norms)

| Percentage Range | Grade | Performance Level |
|------------------|-------|-------------------|
| 91-100 | A1 | Outstanding |
| 81-90 | A2 | Excellent |
| 71-80 | B1 | Very Good |
| 61-70 | B2 | Good |
| 51-60 | C1 | Fair |
| 41-50 | C2 | Satisfactory |
| 33-40 | D | Pass |
| 0-32 | E | Needs Improvement |

## 6. Scope and Limitations

### Scope
- Single school/class management
- Individual student report generation
- Class-wide performance analysis
- Secure data management

### Limitations
- Single-user access (no network support)
- Text-based interface (no GUI)
- Local MySQL database only

## 7. Future Enhancements

- Graphical User Interface (GUI) using Tkinter
- Multi-user network access
- Export reports to PDF/Excel
- Student profile pictures
- Attendance management module
- Fee management module

---

# MODULES AND LIBRARIES USED

## 1. Python (Programming Language)
- **Version:** Python 3.x
- **Purpose:** Core programming language for entire application

## 2. MySQL Connector (mysql-connector-python)
- **Purpose:** Connect Python application to MySQL database
- **Usage:** Database connectivity and SQL query execution

## 3. Pandas
- **Purpose:** Data manipulation and analysis
- **Usage:**
  - Display student records in tabular format
  - Read SQL queries into DataFrames
  - Data filtering and aggregation

## 4. Matplotlib
- **Purpose:** Data visualization and chart generation
- **Usage:**
  - Bar charts for subject-wise performance
  - Pie charts for grade distribution
  - Histograms for percentage distribution

## 5. OS Module (Built-in)
- **Purpose:** Operating system interface
- **Usage:**
  - Screen clearing
  - Directory creation for reports
  - Path manipulation

## 6. Datetime Module (Built-in)
- **Purpose:** Date and time operations
- **Usage:** Adding current date to report cards

## 7. Sys Module (Built-in)
- **Purpose:** System-specific parameters
- **Usage:** Program exit functionality

---

# FUNCTIONS USED

## Database Module (database.py)

| Function | Description | Parameters | Return Type |
|----------|-------------|------------|-------------|
| `get_connection()` | Creates MySQL connection | None | Connection Object |
| `create_database()` | Creates DB and tables | None | Boolean |
| `verify_login()` | Verifies user credentials | username, password | Boolean |

## Operations Module (operations.py)

| Function | Description | Parameters | Return Type |
|----------|-------------|------------|-------------|
| `calculate_grade()` | Calculates CBSE grade | percentage | String |
| `calculate_results()` | Calculates total, %, grade | marks_dict | Dictionary |
| `add_student()` | Inserts new student | roll_no, name, class, etc. | Boolean |
| `search_student()` | Searches by roll_no | roll_no | Dictionary |
| `update_student()` | Updates student record | roll_no, details | Boolean |
| `delete_student()` | Deletes student record | roll_no | Boolean |
| `display_all()` | Returns all students as DataFrame | None | DataFrame |
| `display_by_class()` | Filters by class | class_name | DataFrame |
| `get_subject_averages()` | Gets subject-wise averages | None | Dictionary |
| `get_grade_distribution()` | Gets grade count distribution | None | Dictionary |

## Report Generator Module (report_generator.py)

| Function | Description | Parameters | Return Type |
|----------|-------------|------------|-------------|
| `generate_report_card()` | Creates text report file | roll_no | Boolean |
| `get_performance_descriptor()` | Returns performance text | percentage | String |
| `generate_class_chart()` | Creates bar chart | None | Boolean |
| `generate_pie_chart()` | Creates pie chart | None | Boolean |
| `generate_percentage_histogram()` | Creates histogram | None | Boolean |
| `generate_all_reports()` | Creates all charts | None | None |

## Main Module (main.py)

| Function | Description | Parameters | Return Type |
|----------|-------------|------------|-------------|
| `clear_screen()` | Clears terminal screen | None | None |
| `print_header()` | Prints formatted header | title | None |
| `print_subheader()` | Prints formatted subheader | title | None |
| `press_enter_to_continue()` | Pauses execution | None | None |
| `get_valid_marks()` | Gets validated marks input | subject_name | Integer |
| `get_yes_no()` | Gets yes/no choice | prompt | Boolean |
| `display_student_data()` | Displays student info | student | None |
| `display_dataframe()` | Displays DataFrame | df, message | None |
| `login_menu()` | Handles login process | None | Boolean |
| `add_student_menu()` | Add student menu | None | None |
| `search_student_menu()` | Search student menu | None | None |
| `update_student_menu()` | Update student menu | None | None |
| `delete_student_menu()` | Delete student menu | None | None |
| `display_all_students_menu()` | Display all menu | None | None |
| `display_by_class_menu()` | Display by class menu | None | None |
| `generate_report_menu()` | Generate report menu | None | None |
| `generate_charts_menu()` | Generate charts menu | None | None |
| `main_menu()` | Main application menu | None | None |
| `main()` | Program entry point | None | None |

---

# HARDWARE AND SOFTWARE REQUIREMENTS

## Hardware Requirements

| Component | Minimum Requirement |
|-----------|---------------------|
| Processor | Intel Core i3 / AMD Ryzen 3 |
| RAM | 4 GB |
| Storage | 100 MB free disk space |
| Display | Standard monitor |
| Input | Keyboard and Mouse |

## Software Requirements

| Component | Requirement |
|-----------|-------------|
| Operating System | Windows 10 / 11, Linux, macOS |
| Python Version | Python 3.8 or higher |
| MySQL Server | MySQL 5.7 or higher |
| Python IDE | IDLE, PyCharm, VS Code, or any text editor |

## Python Libraries (pip install)

```bash
pip install mysql-connector-python
pip install pandas
pip install matplotlib
```

## MySQL Configuration

Default credentials (can be changed in database.py):
- Host: localhost
- Port: 3306
- User: root
- Password: (set your MySQL password)
- Database: school_db

---

# WORKING DESCRIPTION

## 1. Program Flow

```
+--------------------+
|    Main Program    |
|      (main.py)     |
+--------------------+
         |
         v
+------------------+
|  Login Screen    |<------------------------+
| (Username/Pass)  |                         |
+--------+---------+                         |
         |                                    |
         v                                    |
+------------------+                          |
| Verify Credentials|                         |
+--------+---------+                          |
         |                                    |
    +----+----+                              |
    | Success? |                              |
    +----+----+                              |
     YES |  NO                                |
     v    v                                   |
    +-+  +-> Back to Login                    |
    | |                                         |
    v |                                         |
+----+-----+                                    |
|Main Menu |                                    |
+--+------+                                     |
   |                                            |
   v                                            |
+--+------+------+------+------+------+------->+
|  |      |      |      |      |      |         |
v  v      v      v      v      v      v         |
Add  Search Update Delete Display Generate      |
Student                                   Charts
       |                                   |
       v                                   |
  +--------+                               |
  | MySQL  |<------------------------------+
  |  DB    |
  +--------+
```

## 2. Database Connection Flow

```
Python App
    |
    v
database.py -> get_connection()
    |
    v
mysql.connector.connect()
    |
    v
school_db Database
    |
    +---> students table
    +---> user_login table
```

## 3. Student Record Flow

```
Input: Student Details + Marks
    |
    v
operations.py -> calculate_results()
    |
    +---> Calculate Total (sum of 5 subjects)
    +---> Calculate Percentage (total/5)
    +---> Calculate Grade (CBSE scale)
    |
    v
database.py -> MySQL INSERT
    |
    v
students Table (with calculated fields)
```

## 4. Report Generation Flow

```
User selects "Generate Report Card"
    |
    v
Enter Roll Number
    |
    v
operations.py -> search_student(roll_no)
    |
    v
Retrieve student data from MySQL
    |
    v
report_generator.py -> generate_report_card()
    |
    v
Create formatted text file in "reports/" folder
```

## 5. Chart Generation Flow

```
User selects "Generate Charts"
    |
    v
Query student data from MySQL
    |
    v
Matplotlib generates chart
    |
    v
Save as PNG in "reports/" folder
    |
    +---> class_performance.png (Bar Chart)
    +---> grade_distribution.png (Pie Chart)
    +---> percentage_distribution.png (Histogram)
```

## 6. User Interaction Steps

### First Time Setup
1. Run main.py
2. Select "Setup Database"
3. Wait for database creation message
4. Login with default credentials (admin/admin)

### Adding a Student
1. Login to the system
2. Select "Add New Student"
3. Enter roll number, name, class, section
4. Enter marks for all 5 subjects
5. Confirm and save

### Generating Report Card
1. Login to the system
2. Select "Search Student" or "Generate Report Card"
3. Enter student's roll number
4. View student details
5. Choose to generate report card
6. Check "reports" folder for output

### Viewing Class Performance
1. Login to the system
2. Select "Display All Students"
3. Choose to generate charts
4. View generated charts in "reports" folder

## 7. Data Flow Diagram

```
                    +----------------+
                    |   Admin User   |
                    +-------+--------+
                            |
                            v
                    +-------+--------+
                    | Login Screen   |
                    +-------+--------+
                            |
                            v
                    +-------+--------+
                    | Main Menu     |
                    +-------+--------+
                            |
        +-------------------+-------------------+
        |           |           |           |
        v           v           v           v
   +----+----+ +----+----+ +----+----+ +----+-----+
   | Add    | |Search   | |Update   | |Delete   |
   |Student | |Student  | |Student  | |Student  |
   +----+----+ +--+-----+ +--+-----+ +--+-------+
        |           |           |           |
        +-----------+-----------+-----------+
                        |
                        v
                +-------+--------+
                | MySQL Database|
                +-------+--------+
                        |
                        v
                +-------+--------+
                |  operations   |
                +-------+--------+
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
   +------+------+ +----+-----+ +--------+
   |add_student| |search_  | |update_  |
   +------+------+ |student | |student  |
          |        +----+-----+ +----+----+
          v             |             |
   +------+------+ +----+-----+ +----+----+
   |report_    | |display_| |delete_   |
   |generator  | |all     | |student   |
   +------+------+ +--+----+ +----+-----+
          |           |           |
          v           v           v
   +------+------+ +--+----+ +--------+
   | Text File | |Pandas | | MySQL   |
   | Report    | |DF     | | DELETE |
   +------+------+ +--+----+ +--------+
          |           |
          v           v
   +------+------+ +--+----+
   | Matplotlib| |GUI    |
   | Charts   | |Table  |
   +----------+ +-------+
```

## 8. File Structure

```
StudentReportCardSystem/
|
+-- main.py                    # Main menu-driven program
+-- database.py                # MySQL connection module
+-- operations.py              # CRUD operations module
+-- report_generator.py       # Report & chart generation
+-- STUDENT_REPORT_CARD_SYSTEM.sql  # SQL setup script
+-- README.md                  # This documentation
|
+-- reports/                   # Auto-generated folder
|   +-- Report_Card_XXX.txt    # Individual report cards
|   +-- class_performance.png  # Bar chart
|   +-- grade_distribution.png # Pie chart
|   +-- percentage_distribution.png # Histogram
|
+-- documentation/            # CBSE project documentation
    +-- (screenshots folder)
```

---

# PROJECT SOURCE CODE

## File 1: database.py

```python
# =====================================================
# DATABASE MODULE
# Student Report Card System
# CBSE Class 12 IP Project
# =====================================================

import mysql.connector
from mysql.connector import Error

HOST = 'localhost'
PORT = 3306
USER = 'root'
PASSWORD = ''  # Update with your MySQL password
DATABASE = 'school_db'


def get_connection():
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
    try:
        connection = mysql.connector.connect(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASSWORD
        )
        cursor = connection.cursor()

        cursor.execute("CREATE DATABASE IF NOT EXISTS school_db")
        cursor.execute("USE school_db")

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

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_login (
                username VARCHAR(50) PRIMARY KEY,
                password VARCHAR(100) NOT NULL
            )
        """)

        cursor.execute("""
            INSERT IGNORE INTO user_login (username, password)
            VALUES ('admin', 'admin')
        """)

        connection.commit()
        cursor.close()
        connection.close()
        print("[SUCCESS] Database and tables created!")
        return True

    except Error as e:
        print(f"[ERROR] Failed to create database: {e}")
        return False


def verify_login(username, password):
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
```

## File 2: operations.py

```python
# =====================================================
# OPERATIONS MODULE
# Student Report Card System
# CBSE Class 12 IP Project
# =====================================================

import pandas as pd
from database import get_connection
from mysql.connector import Error


def calculate_grade(percentage):
    if percentage >= 91:
        return 'A1'
    elif percentage >= 81:
        return 'A2'
    elif percentage >= 71:
        return 'B1'
    elif percentage >= 61:
        return 'B2'
    elif percentage >= 51:
        return 'C1'
    elif percentage >= 41:
        return 'C2'
    elif percentage >= 33:
        return 'D'
    else:
        return 'E'


def calculate_results(marks_dict):
    total = sum(marks_dict.values())
    percentage = total / 5.0
    grade = calculate_grade(percentage)
    return {
        'total_marks': total,
        'percentage': round(percentage, 2),
        'grade': grade
    }


def add_student(roll_no, name, class_name, section,
                physics, chemistry, maths, computer, english):
    try:
        marks = {'physics': physics, 'chemistry': chemistry,
                 'maths': maths, 'computer': computer, 'english': english}
        results = calculate_results(marks)

        connection = get_connection()
        if connection is None:
            return False

        cursor = connection.cursor()
        cursor.execute("""
            INSERT INTO students (
                roll_no, name, class, section,
                physics_marks, chemistry_marks, maths_marks,
                computer_marks, english_marks,
                total_marks, percentage, grade
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (roll_no, name, class_name, section,
              physics, chemistry, maths, computer, english,
              results['total_marks'], results['percentage'], results['grade']))

        connection.commit()
        cursor.close()
        connection.close()
        return True

    except Error as e:
        print(f"[ERROR] Failed to add student: {e}")
        return False


def search_student(roll_no):
    try:
        connection = get_connection()
        if connection is None:
            return None

        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM students WHERE roll_no = %s", (roll_no,))
        result = cursor.fetchone()

        cursor.close()
        connection.close()
        return result

    except Error as e:
        print(f"[ERROR] Failed to search student: {e}")
        return None


def update_student(roll_no, name, class_name, section,
                   physics, chemistry, maths, computer, english):
    try:
        marks = {'physics': physics, 'chemistry': chemistry,
                 'maths': maths, 'computer': computer, 'english': english}
        results = calculate_results(marks)

        connection = get_connection()
        if connection is None:
            return False

        cursor = connection.cursor()
        cursor.execute("""
            UPDATE students SET
                name = %s, class = %s, section = %s,
                physics_marks = %s, chemistry_marks = %s, maths_marks = %s,
                computer_marks = %s, english_marks = %s,
                total_marks = %s, percentage = %s, grade = %s
            WHERE roll_no = %s
        """, (name, class_name, section,
              physics, chemistry, maths, computer, english,
              results['total_marks'], results['percentage'], results['grade'],
              roll_no))

        connection.commit()
        cursor.close()
        connection.close()
        return True

    except Error as e:
        print(f"[ERROR] Failed to update student: {e}")
        return False


def delete_student(roll_no):
    try:
        connection = get_connection()
        if connection is None:
            return False

        cursor = connection.cursor()
        cursor.execute("DELETE FROM students WHERE roll_no = %s", (roll_no,))

        connection.commit()
        cursor.close()
        connection.close()
        return True

    except Error as e:
        print(f"[ERROR] Failed to delete student: {e}")
        return False


def display_all():
    try:
        connection = get_connection()
        if connection is None:
            return None

        query = "SELECT * FROM students ORDER BY roll_no"
        df = pd.read_sql(query, connection)

        cursor = connection.cursor()
        cursor.close()
        connection.close()

        return df

    except Error as e:
        print(f"[ERROR] Failed to display students: {e}")
        return None


def display_by_class(class_name):
    try:
        connection = get_connection()
        if connection is None:
            return None

        query = "SELECT * FROM students WHERE class = %s ORDER BY roll_no"
        df = pd.read_sql(query, connection, params=(class_name,))

        cursor = connection.cursor()
        cursor.close()
        connection.close()

        return df

    except Error as e:
        print(f"[ERROR] Failed to display students: {e}")
        return None
```

## File 3: report_generator.py

```python
# =====================================================
# REPORT GENERATOR MODULE
# Student Report Card System
# CBSE Class 12 IP Project
# =====================================================

import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from datetime import datetime
from database import get_connection
from operations import search_student
import os


def generate_report_card(roll_no):
    student = search_student(roll_no)
    if student is None:
        print("[ERROR] Student not found!")
        return False

    if not os.path.exists('reports'):
        os.makedirs('reports')

    filename = f"reports/Report_Card_{roll_no}.txt"

    with open(filename, 'w') as f:
        f.write("=" * 60 + "\n")
        f.write("           STUDENT REPORT CARD\n")
        f.write("           CBSE Class 12 IP Project\n")
        f.write("=" * 60 + "\n\n")

        f.write("-" * 60 + "\n")
        f.write("STUDENT DETAILS\n")
        f.write("-" * 60 + "\n")
        f.write(f"Roll Number    : {student['roll_no']}\n")
        f.write(f"Name          : {student['name']}\n")
        f.write(f"Class         : {student['class']}\n")
        f.write(f"Section       : {student['section']}\n")
        f.write(f"Date          : {datetime.now().strftime('%d-%B-%Y')}\n")
        f.write("\n")

        f.write("-" * 60 + "\n")
        f.write("ACADEMIC PERFORMANCE\n")
        f.write("-" * 60 + "\n")
        f.write(f"{'Subject':<20} {'Marks Obtained':<20} {'Max Marks':<15}\n")
        f.write("-" * 60 + "\n")
        f.write(f"{'Physics':<20} {student['physics_marks']:<20} {'100':<15}\n")
        f.write(f"{'Chemistry':<20} {student['chemistry_marks']:<20} {'100':<15}\n")
        f.write(f"{'Mathematics':<20} {student['maths_marks']:<20} {'100':<15}\n")
        f.write(f"{'Computer Science':<20} {student['computer_marks']:<20} {'100':<15}\n")
        f.write(f"{'English':<20} {student['english_marks']:<20} {'100':<15}\n")
        f.write("-" * 60 + "\n")

        f.write("\n")
        f.write("-" * 60 + "\n")
        f.write("RESULT SUMMARY\n")
        f.write("-" * 60 + "\n")
        f.write(f"Total Marks Obtained : {student['total_marks']}/500\n")
        f.write(f"Percentage           : {student['percentage']}%\n")
        f.write(f"Grade                : {student['grade']}\n")

        performance = get_performance_descriptor(student['percentage'])
        f.write(f"Performance Level    : {performance}\n")

        f.write("\n")
        f.write("=" * 60 + "\n")
        f.write("  This is a computer-generated report card.\n")
        f.write("  No signature required.\n")
        f.write("=" * 60 + "\n")

    print(f"[SUCCESS] Report card generated: {filename}")
    return True


def get_performance_descriptor(percentage):
    if percentage >= 90:
        return "OUTSTANDING"
    elif percentage >= 80:
        return "EXCELLENT"
    elif percentage >= 70:
        return "VERY GOOD"
    elif percentage >= 60:
        return "GOOD"
    elif percentage >= 50:
        return "FAIR"
    elif percentage >= 40:
        return "PASS"
    else:
        return "NEEDS IMPROVEMENT"


def generate_class_chart():
    try:
        connection = get_connection()
        if connection is None:
            return False

        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT
                AVG(physics_marks) as avg_physics,
                AVG(chemistry_marks) as avg_chemistry,
                AVG(maths_marks) as avg_maths,
                AVG(computer_marks) as avg_computer,
                AVG(english_marks) as avg_english
            FROM students
        """)
        result = cursor.fetchone()
        cursor.close()
        connection.close()

        if result is None:
            return False

        subjects = ['Physics', 'Chemistry', 'Mathematics', 'Computer', 'English']
        avg_marks = [
            result['avg_physics'], result['avg_chemistry'], result['avg_maths'],
            result['avg_computer'], result['avg_english']
        ]

        if not os.path.exists('reports'):
            os.makedirs('reports')

        plt.figure(figsize=(10, 6))
        colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12']
        bars = plt.bar(subjects, avg_marks, color=colors, edgecolor='black')

        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                    f'{height:.1f}', ha='center', va='bottom', fontweight='bold')

        plt.xlabel('Subjects', fontsize=12)
        plt.ylabel('Average Marks', fontsize=12)
        plt.title('Class Performance - Subject Wise Average Marks', fontsize=14, fontweight='bold')
        plt.ylim(0, 100)
        plt.grid(axis='y', linestyle='--', alpha=0.7)

        filepath = 'reports/class_performance.png'
        plt.savefig(filepath, dpi=150, bbox_inches='tight')
        plt.close()

        print(f"[SUCCESS] Chart saved: {filepath}")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to generate chart: {e}")
        return False


def generate_pie_chart():
    try:
        connection = get_connection()
        if connection is None:
            return False

        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT grade, COUNT(*) as count
            FROM students GROUP BY grade ORDER BY grade
        """)
        results = cursor.fetchall()
        cursor.close()
        connection.close()

        if not results:
            return False

        grades = [row['grade'] for row in results]
        counts = [row['count'] for row in results]

        if not os.path.exists('reports'):
            os.makedirs('reports')

        plt.figure(figsize=(8, 8))
        colors = ['#27ae60', '#2980b9', '#8e44ad', '#f39c12', '#e74c3c', '#1abc9c', '#34495e', '#7f8c8d']
        explode = [0.05] * len(grades)

        plt.pie(counts, labels=grades, autopct='%1.1f%%', colors=colors[:len(grades)],
               explode=explode, shadow=True, startangle=90)
        plt.title('Grade Distribution', fontsize=14, fontweight='bold')

        filepath = 'reports/grade_distribution.png'
        plt.savefig(filepath, dpi=150, bbox_inches='tight')
        plt.close()

        print(f"[SUCCESS] Pie chart saved: {filepath}")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to generate pie chart: {e}")
        return False


def generate_percentage_histogram():
    try:
        connection = get_connection()
        if connection is None:
            return False

        query = "SELECT percentage FROM students"
        df = pd.read_sql(query, connection)
        connection.close()

        if df.empty:
            return False

        if not os.path.exists('reports'):
            os.makedirs('reports')

        plt.figure(figsize=(10, 6))
        plt.hist(df['percentage'], bins=10, color='#3498db', edgecolor='black', alpha=0.7)

        plt.xlabel('Percentage', fontsize=12)
        plt.ylabel('Number of Students', fontsize=12)
        plt.title('Percentage Distribution of Students', fontsize=14, fontweight='bold')
        plt.grid(axis='y', linestyle='--', alpha=0.7)

        filepath = 'reports/percentage_distribution.png'
        plt.savefig(filepath, dpi=150, bbox_inches='tight')
        plt.close()

        print(f"[SUCCESS] Histogram saved: {filepath}")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to generate histogram: {e}")
        return False


def generate_all_reports():
    print("\nGenerating all reports...")
    print("-" * 50)
    generate_class_chart()
    generate_pie_chart()
    generate_percentage_histogram()
    print("-" * 50)
    print("[SUCCESS] All reports generated!")
```

## File 4: main.py

```python
# =====================================================
# STUDENT REPORT CARD SYSTEM
# CBSE Class 12 IP Project
# Main Menu-Driven Program
# =====================================================

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import pandas as pd
from database import create_database, verify_login, get_connection
from operations import (
    add_student, search_student, update_student,
    delete_student, display_all, display_by_class,
    calculate_results
)
from report_generator import (
    generate_report_card, generate_class_chart,
    generate_pie_chart, generate_percentage_histogram,
    generate_all_reports
)

current_user = None
logged_in = False


def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')


def print_header(title):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)


def print_subheader(title):
    print("\n-" * 60)
    print(f"  {title}")
    print("-" * 60)


def press_enter_to_continue():
    input("\nPress ENTER to continue...")


def get_valid_marks(subject_name):
    while True:
        try:
            marks = int(input(f"  {subject_name} Marks (0-100): "))
            if 0 <= marks <= 100:
                return marks
            else:
                print("  [ERROR] Marks should be between 0 and 100!")
        except ValueError:
            print("  [ERROR] Please enter a valid integer!")


def get_yes_no(prompt):
    while True:
        choice = input(f"  {prompt} (y/n): ").lower().strip()
        if choice in ['y', 'yes']:
            return True
        elif choice in ['n', 'no']:
            return False
        else:
            print("  [ERROR] Please enter 'y' or 'n'!")


def display_student_data(student):
    if not student:
        print("\n  [ERROR] Student not found!")
        return

    print_subheader("STUDENT DETAILS")
    print(f"  Roll Number     : {student['roll_no']}")
    print(f"  Name           : {student['name']}")
    print(f"  Class          : {student['class']}")
    print(f"  Section        : {student['section']}")

    print_subheader("MARKS")
    print(f"  Physics        : {student['physics_marks']}")
    print(f"  Chemistry      : {student['chemistry_marks']}")
    print(f"  Mathematics    : {student['maths_marks']}")
    print(f"  Computer Sci   : {student['computer_marks']}")
    print(f"  English        : {student['english_marks']}")

    print_subheader("RESULT")
    print(f"  Total Marks    : {student['total_marks']}/500")
    print(f"  Percentage     : {student['percentage']}%")
    print(f"  Grade          : {student['grade']}")


def display_dataframe(df, message="Students"):
    if df is None or df.empty:
        print(f"\n  [INFO] No {message.lower()} found!")
        return

    print(f"\n  Total Records: {len(df)}")
    print("  " + "-" * 90)

    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    pd.set_option('display.max_colwidth', 20)

    display_df = df.copy()
    display_df.columns = [
        'Roll No', 'Name', 'Class', 'Sec',
        'Physics', 'Chemistry', 'Maths', 'Computer', 'English',
        'Total', 'Percent%', 'Grade'
    ]

    print(display_df.to_string(index=False))


def login_menu():
    global current_user, logged_in

    clear_screen()
    print_header("STUDENT REPORT CARD SYSTEM")
    print("\n  [1] Login")
    print("  [2] Setup Database (First Time Users)")
    print("  [3] Exit")

    choice = input("\n  Enter your choice: ").strip()

    if choice == '1':
        username = input("\n  Enter Username: ").strip()
        password = input("  Enter Password: ").strip()

        if verify_login(username, password):
            current_user = username
            logged_in = True
            print("\n  [SUCCESS] Login successful!")
            press_enter_to_continue()
            return True
        else:
            print("\n  [ERROR] Invalid username or password!")
            press_enter_to_continue()
            return False

    elif choice == '2':
        if create_database():
            print("\n  [SUCCESS] Database setup complete!")
            print("  [INFO] You can now login with: admin / admin")
        else:
            print("\n  [ERROR] Database setup failed!")
        press_enter_to_continue()
        return False

    elif choice == '3':
        print("\n  Thank you for using Student Report Card System!")
        print("  Goodbye!\n")
        sys.exit(0)

    else:
        print("\n  [ERROR] Invalid choice!")
        press_enter_to_continue()
        return False


def add_student_menu():
    print_header("ADD NEW STUDENT")

    roll_no = input("\n  Enter Roll Number: ").strip()
    name = input("  Enter Student Name: ").strip()
    class_name = input("  Enter Class (e.g., 12): ").strip()
    section = input("  Enter Section (e.g., A): ").strip().upper()

    print("\n  Enter Marks (0-100):")
    physics = get_valid_marks("Physics")
    chemistry = get_valid_marks("Chemistry")
    maths = get_valid_marks("Mathematics")
    computer = get_valid_marks("Computer Science")
    english = get_valid_marks("English")

    print_subheader("PREVIEW")
    marks = {'physics': physics, 'chemistry': chemistry, 'maths': maths,
             'computer': computer, 'english': english}
    results = calculate_results(marks)
    print(f"  Total Marks: {results['total_marks']}/500")
    print(f"  Percentage: {results['percentage']}%")
    print(f"  Grade: {results['grade']}")

    if get_yes_no("Do you want to save this student record"):
        if add_student(roll_no, name, class_name, section,
                      physics, chemistry, maths, computer, english):
            print("\n  [SUCCESS] Student record added!")
        else:
            print("\n  [ERROR] Failed to add record!")


def search_student_menu():
    print_header("SEARCH STUDENT")

    roll_no = input("\n  Enter Roll Number to search: ").strip()
    student = search_student(roll_no)

    if student:
        display_student_data(student)
        if get_yes_no("\nGenerate Report Card"):
            if generate_report_card(roll_no):
                print("  [SUCCESS] Report card generated!")
    else:
        print("\n  [INFO] Student not found!")


def update_student_menu():
    print_header("UPDATE STUDENT RECORD")

    roll_no = input("\n  Enter Roll Number to update: ").strip()
    student = search_student(roll_no)

    if not student:
        print("\n  [INFO] Student not found!")
        return

    display_student_data(student)

    if not get_yes_no("Do you want to update this record"):
        print("\n  [INFO] Update cancelled.")
        return

    print("\n  Enter NEW details (press ENTER to keep current value):")

    name = input(f"  Name [{student['name']}]: ").strip()
    if not name:
        name = student['name']

    class_name = input(f"  Class [{student['class']}]: ").strip()
    if not class_name:
        class_name = student['class']

    section = input(f"  Section [{student['section']}]: ").strip()
    if not section:
        section = student['section']

    print("\n  Enter NEW Marks (0-100):")
    physics = get_valid_marks("Physics")
    chemistry = get_valid_marks("Chemistry")
    maths = get_valid_marks("Mathematics")
    computer = get_valid_marks("Computer Science")
    english = get_valid_marks("English")

    if update_student(roll_no, name, class_name, section,
                     physics, chemistry, maths, computer, english):
        print("\n  [SUCCESS] Record updated successfully!")
    else:
        print("\n  [ERROR] Failed to update record!")


def delete_student_menu():
    print_header("DELETE STUDENT RECORD")

    roll_no = input("\n  Enter Roll Number to delete: ").strip()
    student = search_student(roll_no)

    if not student:
        print("\n  [INFO] Student not found!")
        return

    display_student_data(student)

    if get_yes_no("Are you sure you want to DELETE this record"):
        if get_yes_no("This action CANNOT be undone! Confirm deletion"):
            if delete_student(roll_no):
                print("\n  [SUCCESS] Record deleted!")
            else:
                print("\n  [ERROR] Failed to delete!")
        else:
            print("\n  [INFO] Deletion cancelled.")
    else:
        print("\n  [INFO] Deletion cancelled.")


def display_all_students_menu():
    print_header("ALL STUDENT RECORDS")

    df = display_all()
    display_dataframe(df, "students")

    if df is not None and not df.empty:
        if get_yes_no("\nGenerate all charts"):
            generate_all_reports()


def display_by_class_menu():
    print_header("STUDENTS BY CLASS")

    class_name = input("\n  Enter Class (e.g., 12): ").strip()
    df = display_by_class(class_name)
    display_dataframe(df, f"students in class {class_name}")


def generate_report_menu():
    print_header("GENERATE REPORT CARD")

    roll_no = input("\n  Enter Roll Number: ").strip()
    student = search_student(roll_no)

    if not student:
        print("\n  [INFO] Student not found!")
        return

    display_student_data(student)

    if get_yes_no("\nGenerate Report Card"):
        if generate_report_card(roll_no):
            print("  [SUCCESS] Report card generated!")


def generate_charts_menu():
    print_header("GENERATE CLASS ANALYSIS CHARTS")

    print("\n  [1] Subject-wise Average Performance (Bar Chart)")
    print("  [2] Grade Distribution (Pie Chart)")
    print("  [3] Percentage Distribution (Histogram)")
    print("  [4] All Charts")

    choice = input("\n  Enter your choice: ").strip()

    if choice == '1':
        generate_class_chart()
    elif choice == '2':
        generate_pie_chart()
    elif choice == '3':
        generate_percentage_histogram()
    elif choice == '4':
        generate_all_reports()
    else:
        print("\n  [ERROR] Invalid choice!")
        return

    print("\n  [SUCCESS] Charts saved in 'reports' folder!")


def main_menu():
    while True:
        clear_screen()
        user_str = f"Logged in as: {current_user}" if current_user else ""
        print_header("STUDENT REPORT CARD SYSTEM - MAIN MENU")
        if user_str:
            print(f"  {user_str}")
        print("  [Academic Year: 2025-2026]")
        print("\n")
        print("  [1] Add New Student")
        print("  [2] Search Student")
        print("  [3] Update Student Record")
        print("  [4] Delete Student Record")
        print("  [5] Display All Students")
        print("  [6] Display Students by Class")
        print("  [7] Generate Individual Report Card")
        print("  [8] Generate Class Analysis Charts")
        print("  [9] Setup/Reset Database")
        print("  [10] Logout")
        print("  [11] Exit")

        choice = input("\n  Enter your choice (1-11): ").strip()

        if choice == '1':
            add_student_menu()
        elif choice == '2':
            search_student_menu()
        elif choice == '3':
            update_student_menu()
        elif choice == '4':
            delete_student_menu()
        elif choice == '5':
            display_all_students_menu()
        elif choice == '6':
            display_by_class_menu()
        elif choice == '7':
            generate_report_menu()
        elif choice == '8':
            generate_charts_menu()
        elif choice == '9':
            if get_yes_no("This will RESET the database! Continue"):
                if create_database():
                    print("\n  [SUCCESS] Database reset complete!")
                else:
                    print("\n  [ERROR] Database reset failed!")
        elif choice == '10':
            global logged_in
            logged_in = False
            current_user = None
            print("\n  [INFO] Logged out successfully!")
            press_enter_to_continue()
            return
        elif choice == '11':
            print("\n" + "=" * 60)
            print("  Thank you for using Student Report Card System!")
            print("  Created for CBSE Class 12 IP Project")
            print("=" * 60 + "\n")
            sys.exit(0)
        else:
            print("\n  [ERROR] Invalid choice!")

        press_enter_to_continue()


def main():
    clear_screen()
    print_header("STUDENT REPORT CARD SYSTEM")
    print("  CBSE Class 12 IP Project")
    print("  Academic Year: 2025-2026")
    print("\n  A menu-driven application for managing")
    print("  student records and generating report cards.")
    print("\n  Features:")
    print("  - MySQL Database Backend")
    print("  - Pandas for Data Handling")
    print("  - Matplotlib for Charts")
    print("  - Complete CBSE Documentation")

    press_enter_to_continue()

    while True:
        if login_menu():
            break

    while logged_in:
        main_menu()

    if not logged_in:
        main()


if __name__ == "__main__":
    main()
```

## File 5: STUDENT_REPORT_CARD_SYSTEM.sql

```sql
-- =====================================================
-- STUDENT REPORT CARD SYSTEM
-- CBSE Class 12 IP Project
-- Database Setup Script
-- =====================================================

CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS user_login;

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

CREATE TABLE user_login (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);

INSERT INTO user_login (username, password) VALUES ('admin', 'admin');

-- Sample Data
INSERT INTO students (roll_no, name, class, section, physics_marks, chemistry_marks, maths_marks, computer_marks, english_marks, total_marks, percentage, grade)
VALUES
('101', 'Rahul Sharma', '12', 'A', 85, 78, 92, 88, 76, 419, 83.8, 'A'),
('102', 'Priya Patel', '12', 'A', 91, 85, 78, 94, 82, 430, 86.0, 'A'),
('103', 'Amit Kumar', '12', 'B', 65, 72, 58, 70, 68, 333, 66.6, 'B'),
('104', 'Sneha Gupta', '12', 'B', 88, 92, 85, 90, 87, 442, 88.4, 'A'),
('105', 'Vikram Singh', '12', 'A', 55, 48, 62, 58, 65, 288, 57.6, 'C');
```

---

# OUTPUT SCREENSHOTS

## (Include screenshots of the following outputs in your project documentation)

1. **Login Screen** - Main login menu
2. **Database Setup** - Successful database creation message
3. **Main Menu** - All menu options displayed
4. **Add Student** - Form for entering new student data
5. **Display All Students** - Table view of all records
6. **Report Card Text File** - Sample generated report
7. **Bar Chart** - Subject-wise performance chart
8. **Pie Chart** - Grade distribution chart
9. **Histogram** - Percentage distribution chart

### How to Take Screenshots:

1. Run the program
2. Navigate to the desired screen
3. Take screenshot using:
   - Windows: `Snipping Tool` or `Win+Shift+S`
   - Mac: `Cmd+Shift+4`
   - Linux: `gnome-screenshot`

4. Save screenshots in `documentation/screenshots/` folder

---

# BIBLIOGRAPHY

## Books Referenced

1. **Computer Science with Python** - Sumita Arora (Dhanpat Rai & Co.)
2. **Python Programming** - John Zelle (Franklin, Beedle & Associates)
3. **MySQL Workbench: Visual Database Design** - Brian Keigher (Packt Publishing)

## Online Resources

1. **MySQL Documentation**: https://dev.mysql.com/doc/
2. **Pandas Documentation**: https://pandas.pydata.org/docs/
3. **Matplotlib Documentation**: https://matplotlib.org/stable/contents.html
4. **Python Official Documentation**: https://docs.python.org/3/

## Libraries Used

1. **mysql-connector-python**: https://pypi.org/project/mysql-connector-python/
2. **pandas**: https://pypi.org/project/pandas/
3. **matplotlib**: https://pypi.org/project/matplotlib/

## CBSE Resources

1. CBSE Class 12 IP Syllabus 2025-26
2. CBSE Guidelines for Practical Records

---

## PROJECT COMPLETION CHECKLIST

- [ ] Title Page with all details
- [ ] Index with page numbers
- [ ] Acknowledgement
- [ ] Project Analysis
- [ ] Modules and Libraries Used
- [ ] Functions Used (with parameter tables)
- [ ] Hardware and Software Requirements
- [ ] Working Description with diagrams
- [ ] Complete Source Code
- [ ] Output Screenshots
- [ ] Bibliography
- [ ] SQL Script file
- [ ] Soft copy of project on USB/CD
- [ ] Hard copy printed and bound

---

**Project Created by:** [Your Name]
**Class:** 12 - Commerce (IP)
**Academic Year:** 2025-2026
**Subject Teacher:** [Teacher Name]
