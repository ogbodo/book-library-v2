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
    super(firstName, lastName, gender, 'STUDENT', faculty, department); //To enable proper inheritance
    this.level = level;
    this.matricNumber = matricNumber;
  }
}
module.exports = Student;
