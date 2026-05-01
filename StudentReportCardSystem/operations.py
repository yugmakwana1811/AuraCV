# =====================================================
# OPERATIONS MODULE
# Student Report Card System
# CBSE Class 12 IP Project
# =====================================================

import pandas as pd
from database import get_connection
from mysql.connector import Error


# =====================================================
# GRADE CALCULATION
# =====================================================
def calculate_grade(percentage):
    """
    Calculate grade based on percentage.
    CBSE grading scale:
    A1: 91-100, A2: 81-90, B1: 71-80, B2: 61-70,
    C1: 51-60, C2: 41-50, D: 33-40, E: 0-32
    """
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
    """
    Calculate total, percentage, and grade from marks dictionary.
    marks_dict: dict with keys: physics, chemistry, maths, computer, english
    """
    total = sum(marks_dict.values())
    percentage = total / 5.0
    grade = calculate_grade(percentage)

    return {
        'total_marks': total,
        'percentage': round(percentage, 2),
        'grade': grade
    }


# =====================================================
# ADD STUDENT
# =====================================================
def add_student(roll_no, name, class_name, section,
                physics, chemistry, maths, computer, english):
    """
    Add a new student record to the database.
    Returns True if successful, False otherwise.
    """
    try:
        marks = {
            'physics': physics,
            'chemistry': chemistry,
            'maths': maths,
            'computer': computer,
            'english': english
        }
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


# =====================================================
# SEARCH STUDENT
# =====================================================
def search_student(roll_no):
    """
    Search for a student by roll number.
    Returns a dictionary with student data or None if not found.
    """
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


# =====================================================
# UPDATE STUDENT
# =====================================================
def update_student(roll_no, name, class_name, section,
                   physics, chemistry, maths, computer, english):
    """
    Update an existing student record.
    Returns True if successful, False otherwise.
    """
    try:
        marks = {
            'physics': physics,
            'chemistry': chemistry,
            'maths': maths,
            'computer': computer,
            'english': english
        }
        results = calculate_results(marks)

        connection = get_connection()
        if connection is None:
            return False

        cursor = connection.cursor()
        cursor.execute("""
            UPDATE students SET
                name = %s,
                class = %s,
                section = %s,
                physics_marks = %s,
                chemistry_marks = %s,
                maths_marks = %s,
                computer_marks = %s,
                english_marks = %s,
                total_marks = %s,
                percentage = %s,
                grade = %s
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


# =====================================================
# DELETE STUDENT
# =====================================================
def delete_student(roll_no):
    """
    Delete a student record by roll number.
    Returns True if successful, False otherwise.
    """
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


# =====================================================
# DISPLAY ALL STUDENTS
# =====================================================
def display_all():
    """
    Retrieve all student records as a Pandas DataFrame.
    Returns DataFrame with all student data.
    """
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


# =====================================================
# DISPLAY STUDENTS BY CLASS
# =====================================================
def display_by_class(class_name):
    """
    Retrieve all student records for a specific class.
    """
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


# =====================================================
# GET SUBJECT WISE AVERAGES
# =====================================================
def get_subject_averages():
    """
    Get subject-wise average marks for all students.
    Returns dictionary with subject averages.
    """
    try:
        connection = get_connection()
        if connection is None:
            return None

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

        return result

    except Error as e:
        print(f"[ERROR] Failed to get averages: {e}")
        return None


# =====================================================
# GET GRADE DISTRIBUTION
# =====================================================
def get_grade_distribution():
    """
    Get count of students for each grade.
    Returns dictionary with grade counts.
    """
    try:
        connection = get_connection()
        if connection is None:
            return None

        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT grade, COUNT(*) as count
            FROM students
            GROUP BY grade
            ORDER BY grade
        """)

        results = cursor.fetchall()
        cursor.close()
        connection.close()

        grade_dict = {}
        for row in results:
            grade_dict[row['grade']] = row['count']

        return grade_dict

    except Error as e:
        print(f"[ERROR] Failed to get grade distribution: {e}")
        return None


# =====================================================
# TEST FUNCTION
# =====================================================
if __name__ == "__main__":
    print("Testing Operations Module...")
    print("-" * 50)

    # Test add student
    print("Adding test student...")
    if add_student('999', 'Test Student', '12', 'A', 85, 90, 78, 92, 88):
        print("[SUCCESS] Student added!")
    else:
        print("[FAILED] Could not add student.")

    # Test search
    print("Searching for test student...")
    student = search_student('999')
    if student:
        print(f"[FOUND] {student['name']} - Grade: {student['grade']}")
    else:
        print("[NOT FOUND]")

    # Test display
    print("Displaying all students...")
    df = display_all()
    if df is not None:
        print(f"Total students: {len(df)}")
        print(df.head())

    # Test delete
    print("Deleting test student...")
    if delete_student('999'):
        print("[SUCCESS] Student deleted!")
