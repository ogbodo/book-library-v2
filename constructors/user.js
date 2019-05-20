const databaseHandler = require('../databases/database'); //Import the database
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

class User {
  //User constructor definition
  constructor(firstName, lastName, gender, userType, faculty, department) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.userType = userType;
    this.department = department;
    this.faculty = faculty;

    this.id = generateId(this.getUsers()); //Generates a new Id for this book

    this.save(); //Save this user to the user database
  }

  //this method gets all users
  getUsers() {
    return databaseHandler['users'];
  }

  //This method saves user to the database
  save() {
    databaseHandler['users'].push(this);
  }
}

module.exports = User; //Export this class for external use
