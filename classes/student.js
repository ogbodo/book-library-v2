const user = require('./user'); //Import the User class
const admin = require('./admin'); //Import the Admin class

//Make Student to inherit from User by using the extends key word
class Student extends user {
  //Student constructor definition
  constructor(
    firstName,
    lastName,
    matricNumber,
    gender,
    faculty,
    department,
    level
  ) {
    super(firstName, lastName, gender, 'STUDENT', faculty, department); //Call the parent constructor with the required arguments
    this.level = level;
    this.matricNumber = matricNumber;
  }

  //Updates user's details
  updatePersonalDetails(
    firstName = this.firstName,
    lastName = this.lastName,
    gender = this.gender,
    faculty = this.faculty,
    department = this.department,
    matricNumber = this.matricNumber,
    level = this.level
  ) {
    //all the parent updatePersonalDetails method with the required arguments
    super.updatePersonalDetails(
      firstName,
      lastName,
      gender,
      faculty,
      department
    );
    this.level = level;
    this.matricNumber = matricNumber;
  }

  //This method enables student to borrow book
  borrowBook(bookId) {
    return admin.prototype.lendBook(this, bookId);
  }

  //This method enables student to return borrowed book
  returnBorrowedbook(bookId) {
    return admin.prototype.returnBook(bookId);
  }
}
module.exports = Student;
