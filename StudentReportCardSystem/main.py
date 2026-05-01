# =====================================================
# STUDENT REPORT CARD SYSTEM
# CBSE Class 12 IP Project
# Main Menu-Driven Program
# =====================================================

import sys
import os

# Add current directory to path for imports
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


# =====================================================
# GLOBAL VARIABLES
# =====================================================
current_user = None
logged_in = False


# =====================================================
# HELPER FUNCTIONS
# =====================================================
def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')


def print_header(title):
    """Print a formatted header."""
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)


def print_subheader(title):
    """Print a formatted subheader."""
    print("\n-" * 60)
    print(f"  {title}")
    print("-" * 60)


def press_enter_to_continue():
    """Wait for user to press Enter."""
    input("\nPress ENTER to continue...")


def get_valid_marks(subject_name):
    """Get valid marks input from user."""
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
    """Get yes/no input from user."""
    while True:
        choice = input(f"  {prompt} (y/n): ").lower().strip()
        if choice in ['y', 'yes']:
            return True
        elif choice in ['n', 'no']:
            return False
        else:
            print("  [ERROR] Please enter 'y' for yes or 'n' for no!")


def display_student_data(student):
    """Display student data in formatted manner."""
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
    """Display a Pandas DataFrame in formatted manner."""
    if df is None or df.empty:
        print(f"\n  [INFO] No {message.lower()} found!")
        return

    print(f"\n  Total Records: {len(df)}")
    print("  " + "-" * 90)

    # Format DataFrame display
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    pd.set_option('display.max_colwidth', 20)

    # Rename columns for display
    display_df = df.copy()
    display_df.columns = [
        'Roll No', 'Name', 'Class', 'Sec',
        'Physics', 'Chemistry', 'Maths', 'Computer', 'English',
        'Total', 'Percent%', 'Grade'
    ]

    print(display_df.to_string(index=False))


# =====================================================
# LOGIN / REGISTRATION
# =====================================================
def login_menu():
    """Display login menu and handle authentication."""
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
            print("  [HINT] Use 'admin' / 'admin' for default login")
            press_enter_to_continue()
            return False

    elif choice == '2':
        if create_database():
            print("\n  [SUCCESS] Database setup complete!")
            print("  [INFO] You can now login with: admin / admin")
        else:
            print("\n  [ERROR] Database setup failed!")
            print("  [INFO] Make sure MySQL is running and credentials are correct")
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


# =====================================================
# MENU OPTIONS
# =====================================================
def add_student_menu():
    """Handle adding a new student."""
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
            print("\n  [SUCCESS] Student record added successfully!")
        else:
            print("\n  [ERROR] Failed to add student record!")
            print("  [HINT] Roll number might already exist!")
    else:
        print("\n  [INFO] Student record not saved.")


def search_student_menu():
    """Handle searching for a student."""
    print_header("SEARCH STUDENT")

    roll_no = input("\n  Enter Roll Number to search: ").strip()

    student = search_student(roll_no)
    if student:
        display_student_data(student)

        # Option to generate report
        if get_yes_no("\nGenerate Report Card"):
            if generate_report_card(roll_no):
                print("  [SUCCESS] Report card generated in 'reports' folder!")
    else:
        print("\n  [INFO] Student not found!")


def update_student_menu():
    """Handle updating a student record."""
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
        print("\n  [SUCCESS] Student record updated successfully!")
    else:
        print("\n  [ERROR] Failed to update student record!")


def delete_student_menu():
    """Handle deleting a student record."""
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
                print("\n  [SUCCESS] Student record deleted successfully!")
            else:
                print("\n  [ERROR] Failed to delete student record!")
        else:
            print("\n  [INFO] Deletion cancelled.")
    else:
        print("\n  [INFO] Deletion cancelled.")


def display_all_students_menu():
    """Handle displaying all students."""
    print_header("ALL STUDENT RECORDS")

    df = display_all()
    display_dataframe(df, "students")

    if df is not None and not df.empty:
        if get_yes_no("\nGenerate all charts"):
            generate_all_reports()


def display_by_class_menu():
    """Handle displaying students by class."""
    print_header("STUDENTS BY CLASS")

    class_name = input("\n  Enter Class (e.g., 12): ").strip()

    df = display_by_class(class_name)
    display_dataframe(df, f"students in class {class_name}")


def generate_report_menu():
    """Handle generating individual report cards."""
    print_header("GENERATE REPORT CARD")

    roll_no = input("\n  Enter Roll Number: ").strip()

    student = search_student(roll_no)
    if not student:
        print("\n  [INFO] Student not found!")
        return

    display_student_data(student)

    if get_yes_no("\nGenerate Report Card"):
        if generate_report_card(roll_no):
            print("  [SUCCESS] Report card generated in 'reports' folder!")


def generate_charts_menu():
    """Handle generating charts and analysis."""
    print_header("GENERATE CLASS ANALYSIS CHARTS")

    print("\n  [1] Subject-wise Average Performance (Bar Chart)")
    print("  [2] Grade Distribution (Pie Chart)")
    print("  [3] Percentage Distribution (Histogram)")
    print("  [4] All Charts")

    choice = input("\n  Enter your choice: ").strip()

    success = True

    if choice == '1':
        success = generate_class_chart()
    elif choice == '2':
        success = generate_pie_chart()
    elif choice == '3':
        success = generate_percentage_histogram()
    elif choice == '4':
        generate_all_reports()
    else:
        print("\n  [ERROR] Invalid choice!")
        return

    if success or choice == '4':
        print("\n  [SUCCESS] Charts saved in 'reports' folder!")


# =====================================================
# MAIN MENU
# =====================================================
def main_menu():
    """Display main menu and handle all operations."""
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
            print("\n  [ERROR] Invalid choice! Please enter 1-11.")

        press_enter_to_continue()


# =====================================================
# MAIN PROGRAM
# =====================================================
def main():
    """Main entry point of the application."""
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

    # Login loop
    while True:
        if login_menu():
            break

    # Main menu loop
    while logged_in:
        main_menu()

    # If logged out, go back to login
    if not logged_in:
        main()


if __name__ == "__main__":
    main()
