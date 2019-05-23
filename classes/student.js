const user = require('./user'); //Import the User object
const admin = require('./admin'); //Import the Admin object

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
}
module.exports = Student;
