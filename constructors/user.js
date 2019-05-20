const databaseHandler = require('../databases/database'); //Import the database
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

let firstNameSymbole = Symbol('firstName');
let lastNameSymbole = Symbol('lastName');
let genderSymbole = Symbol('gender');
let userTypeSymbole = Symbol('userType');
let departmentSymbole = Symbol('department');
let facultySymbole = Symbol('faculty');
let idSymbole = Symbol('id');

class User {
  //User constructor definition
  constructor(firstName, lastName, gender, userType, faculty, department) {
    this[firstNameSymbole] = firstName;
    this[lastNameSymbole] = lastName;
    this[genderSymbole] = gender;
    this[userTypeSymbole] = userType;
    this[departmentSymbole] = department;
    this[facultySymbole] = faculty;

    this[idSymbole] = generateId(this.getUsers()); //Generates a new Id for this book

    this.save(); //Save this user to the user database
  }

  getFirstName() {
    return this[firstNameSymbole];
  }

  getLastName() {
    return this[lastNameSymbole];
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
