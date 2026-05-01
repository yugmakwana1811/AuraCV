# =====================================================
# REPORT GENERATOR MODULE
# Student Report Card System
# CBSE Class 12 IP Project
# =====================================================

import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
from datetime import datetime
from database import get_connection
from operations import search_student
import os


# =====================================================
# GENERATE REPORT CARD (TEXT FILE)
# =====================================================
def generate_report_card(roll_no):
    """
    Generate a formatted report card text file for a student.
    Returns True if successful, False otherwise.
    """
    student = search_student(roll_no)
    if student is None:
        print("[ERROR] Student not found!")
        return False

    # Create reports directory if it doesn't exist
    if not os.path.exists('reports'):
        os.makedirs('reports')

    filename = f"reports/Report_Card_{roll_no}.txt"

    with open(filename, 'w') as f:
        # Header
        f.write("=" * 60 + "\n")
        f.write("           STUDENT REPORT CARD\n")
        f.write("           CBSE Class 12 IP Project\n")
        f.write("=" * 60 + "\n\n")

        # Student Details
        f.write("-" * 60 + "\n")
        f.write("STUDENT DETAILS\n")
        f.write("-" * 60 + "\n")
        f.write(f"Roll Number    : {student['roll_no']}\n")
        f.write(f"Name          : {student['name']}\n")
        f.write(f"Class         : {student['class']}\n")
        f.write(f"Section       : {student['section']}\n")
        f.write(f"Date          : {datetime.now().strftime('%d-%B-%Y')}\n")
        f.write("\n")

        # Marks
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

        # Result Summary
        f.write("\n")
        f.write("-" * 60 + "\n")
        f.write("RESULT SUMMARY\n")
        f.write("-" * 60 + "\n")
        f.write(f"Total Marks Obtained : {student['total_marks']}/500\n")
        f.write(f"Percentage           : {student['percentage']}%\n")
        f.write(f"Grade                : {student['grade']}\n")

        # Performance descriptor
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
    """Get performance descriptor based on percentage."""
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


# =====================================================
# GENERATE CLASS PERFORMANCE CHART (BAR CHART)
# =====================================================
def generate_class_chart():
    """
    Generate a bar chart showing subject-wise average marks.
    Saves chart as 'reports/class_performance.png'
    """
    try:
        connection = get_connection()
        if connection is None:
            return False

        # Get subject averages
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
            print("[ERROR] No data available for chart!")
            return False

        # Create chart
        subjects = ['Physics', 'Chemistry', 'Mathematics', 'Computer', 'English']
        avg_marks = [
            result['avg_physics'],
            result['avg_chemistry'],
            result['avg_maths'],
            result['avg_computer'],
            result['avg_english']
        ]

        # Create reports directory if it doesn't exist
        if not os.path.exists('reports'):
            os.makedirs('reports')

        # Create bar chart
        plt.figure(figsize=(10, 6))
        colors = ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f39c12']
        bars = plt.bar(subjects, avg_marks, color=colors, edgecolor='black')

        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                    f'{height:.1f}',
                    ha='center', va='bottom', fontweight='bold')

        plt.xlabel('Subjects', fontsize=12)
        plt.ylabel('Average Marks', fontsize=12)
        plt.title('Class Performance - Subject Wise Average Marks', fontsize=14, fontweight='bold')
        plt.ylim(0, 100)
        plt.grid(axis='y', linestyle='--', alpha=0.7)

        # Save chart
        filepath = 'reports/class_performance.png'
        plt.savefig(filepath, dpi=150, bbox_inches='tight')
        plt.close()

        print(f"[SUCCESS] Class performance chart saved: {filepath}")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to generate chart: {e}")
        return False


# =====================================================
# GENERATE GRADE DISTRIBUTION CHART (PIE CHART)
# =====================================================
def generate_pie_chart():
    """
    Generate a pie chart showing grade distribution.
    Saves chart as 'reports/grade_distribution.png'
    """
    try:
        connection = get_connection()
        if connection is None:
            return False

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

        if not results:
            print("[ERROR] No data available for chart!")
            return False

        grades = [row['grade'] for row in results]
        counts = [row['count'] for row in results]

        # Create reports directory if it doesn't exist
        if not os.path.exists('reports'):
            os.makedirs('reports')

        # Create pie chart
        plt.figure(figsize=(8, 8))
        colors = ['#27ae60', '#2980b9', '#8e44ad', '#f39c12', '#e74c3c', '#1abc9c', '#34495e', '#7f8c8d']
        explode = [0.05] * len(grades)

        plt.pie(counts, labels=grades, autopct='%1.1f%%', colors=colors[:len(grades)],
               explode=explode, shadow=True, startangle=90)
        plt.title('Grade Distribution', fontsize=14, fontweight='bold')

        # Save chart
        filepath = 'reports/grade_distribution.png'
        plt.savefig(filepath, dpi=150, bbox_inches='tight')
        plt.close()

        print(f"[SUCCESS] Grade distribution chart saved: {filepath}")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to generate pie chart: {e}")
        return False


# =====================================================
# GENERATE PERCENTAGE DISTRIBUTION CHART (HISTOGRAM)
# =====================================================
def generate_percentage_histogram():
    """
    Generate a histogram showing percentage distribution.
    Saves chart as 'reports/percentage_distribution.png'
    """
    try:
        connection = get_connection()
        if connection is None:
            return False

        query = "SELECT percentage FROM students"
        df = pd.read_sql(query, connection)
        connection.close()

        if df.empty:
            print("[ERROR] No data available for chart!")
            return False

        # Create reports directory if it doesn't exist
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

        print(f"[SUCCESS] Percentage histogram saved: {filepath}")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to generate histogram: {e}")
        return False


# =====================================================
# GENERATE ALL REPORTS
# =====================================================
def generate_all_reports():
    """
    Generate all charts and reports for the class.
    """
    print("\nGenerating all reports...")
    print("-" * 50)

    generate_class_chart()
    generate_pie_chart()
    generate_percentage_histogram()

    print("-" * 50)
    print("[SUCCESS] All reports generated in 'reports' folder!")


# =====================================================
# TEST FUNCTION
# =====================================================
if __name__ == "__main__":
    print("Testing Report Generator Module...")
    print("-" * 50)

    # Generate sample report
    print("Generating sample report card for roll_no '101'...")
    generate_report_card('101')

    # Generate charts
    print("\nGenerating charts...")
    generate_class_chart()
    generate_pie_chart()
    generate_percentage_histogram()
