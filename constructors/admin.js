const user = require('./user'); //Import the User Object
// const bookLibrary = require('./book-library'); //Import the book library
// const databaseHandler = require('../database/database'); //Import the database
// const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//Make Admin to inherit from User by using the extends key word
class Admin extends user {
  //Admin constructor definition
  constructor(firstName, lastName, gender) {
    super(firstName, lastName, gender, 'ADMIN'); //call the parent constructor with the required arguments
  }

  //Get a user by id
  getUserByID(id) {
    const users = this.getUsers(); //Returns the collection of Users

    return users.find(user => user.getId() === id); //Compare each user id with the user id we are interested in and return it.
  }

  //Get all users with same either first-name or last-name
  searchUserByName(name) {
    const users = this.getUsers(); //Returns the collection of Users

    //Filter each user name based on the name we are interested in.
    const results = users.filter(
      user => user.firstName === name || user.lastName === name
    );

    return results.length === 0 ? false : results; //Returns false if no result found else returns true
  }

  //This method returns all teachers
  getAllTeachers() {
    return this.getUserSets('TEACHER');
  }

  //This method returns all students
  getAllStudents() {
    return this.getUserSets('STUDENT');
  }

  //This method returns all admins
  getAllAdmins() {
    return this.getUserSets('ADMIN');
  }

  //This method retrieves users based on their user type: Teachers, Students or Admins
  getUserSets(userType) {
    const users = Admin.prototype.getUsers(); //Returns the collection of Users

    return users.filter(user => user.userType === userType); //Filter users id based on the id we are interested in and return them.
  }

  //This method reads a student
  readStudent(matricNumber) {
    const users = this.getUsers(); //Returns the collection of Users
    return users.find(user => user.matricNumber === matricNumber); //Compare each user matric number with the matric number we are interested in and return it.
  }

  //This method reads a teacher
  readTeacher(staffId) {
    const users = this.getUsers(); //Returns the collection of Users
    return users.find(user => user.staffId === staffId); //Compare each user staff id with the staff id we are interested in and return it.
  }
}

module.exports = Admin;
