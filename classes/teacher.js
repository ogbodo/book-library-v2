const user = require('./user'); //Import the User class
const admin = require('./admin'); //Import the Admin class

//Make Teacher to inherit from User by using the extends key word
class Teacher extends user {
  //Teacher constructor definition
  constructor(firstName, lastName, staffId, gender, faculty, department) {
    super(firstName, lastName, gender, 'TEACHER', faculty, department); //call the parent constructor with the required arguments
    this.staffId = staffId;
  }

  //Updates user's details
  updatePersonalDetails(
    firstName = this.firstName,
    lastName = this.lastName,
    gender = this.gender,
    faculty = this.faculty,
    department = this.department,
    staffId = this.staffId
  ) {
    //all the parent updatePersonalDetails method with the required arguments
    super.updatePersonalDetails(
      firstName,
      lastName,
      gender,
      faculty,
      department
    );
    this.staffId = staffId;
  }
}
module.exports = Teacher;
