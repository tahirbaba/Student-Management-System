import inquirer from "inquirer";
// Define the Student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    //   Method to view a student balance
    viewBalance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }
    // Method to pay a student fees
    payFees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
    }
    // Method to display student status
    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// Define Student Manager class to manage student
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${name} added successfully. Student ID: ${student.id}`);
        // this.students.push(new Student(name));
    }
    // Method to enroll a student in a course
    enrollStudent(studentId, course) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    viewStudentBalance(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
        // let student = this.students.find()
    }
    // Method to pay student fees
    payStudentFees(studentId, amount) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    // Method to display student status
    showStudentStatus(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        }
    }
    // Method to find a student by studentId
    findStudent(studentId) {
        return this.students.find(std => std.id === studentId);
    }
}
// Main Function to run the Program
async function main() {
    console.log("Welcome to 'Institute of Hasni' - Student Management System");
    console.log("-".repeat(50));
    let studentManager = new StudentManager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        // Switch Case to handle user choice
        switch (choice.choices) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                studentManager.addStudent(nameInput.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                studentManager.enrollStudent(courseInput.studentId, courseInput.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                studentManager.viewStudentBalance(balanceInput.studentId);
                break;
            case "Pay Student Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to be paid",
                    }
                ]);
                studentManager.payStudentFees(feesInput.studentId, feesInput.amount);
                break;
            case "Show Student Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                studentManager.showStudentStatus(statusInput.studentId);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// Calling a main Function
main();
