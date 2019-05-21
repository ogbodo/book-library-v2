const user = require('./user'); //Import the User object
const admin = require('./admin'); //Import the Admin object

//Make Teacher to inherit from User by using the extends key word
class Teacher extends user {
  //Teacher constructor definition
  constructor(firstName, lastName, staffId, gender, faculty, department) {
    super(firstName, lastName, gender, 'TEACHER', faculty, department); //call the parent constructor with the required arguments
    this.staffId = staffId;
  }
}
module.exports = Teacher;
