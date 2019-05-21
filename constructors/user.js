const databaseHandler = require('../databases/database'); //Import the database
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

let firstNameSymbole = Symbol('firstName');
let lastNameSymbole = Symbol('lastName');
let genderSymbole = Symbol('gender');
let userTypeSymbole = Symbol('userType');
let departmentSymbole = Symbol('department');
let facultySymbole = Symbol('faculty');

class User {
  //User constructor definition
  constructor(firstName, lastName, gender, userType, faculty, department) {
    this[firstNameSymbole] = firstName;
    this[lastNameSymbole] = lastName;
    this[genderSymbole] = gender;
    this[userTypeSymbole] = userType;
    this[departmentSymbole] = department;
    this[facultySymbole] = faculty;

    this.id = generateId(this.getUsers()); //Generates a new Id for this book

    this.save(); //Save this user to the user database
  }

  //Gets user's first-name
  getFirstName() {
    return this[firstNameSymbole];
  }

  //Gets user's last-name
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

  //Updates user's details
  updatePersonalDetails(firstName, lastName, gender, faculty, department) {
    this[firstNameSymbole] = firstName;
    this[lastNameSymbole] = lastName;
    this[genderSymbole] = gender;
    this[departmentSymbole] = department;
    this[facultySymbole] = faculty;
  }

  //Enables user to delete own account
  delete() {
    const users = this.getUsers(); //Returns the collection of Users

    for (let index in users) {
      //Compare each user-Id with the user Id we are interested in.
      if (users[index].id === this.id) {
        users.splice(index, 1); //Using the splice method of Javascript to remove one user at a particular position(i.e at a particular index) of the users collection.

        return true; //returns true as a response
      }
    }
  }

  //Gets user's information as an object
  retrieveDetails() {
    const users = this.getUsers(); //Returns the collection of Users
    return users.find(user => user.id === this.id);
  }
}

module.exports = User; //Export this class for external use
