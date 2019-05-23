const databaseHandler = require('../databases/database'); //Import the database
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

let id = Symbol('id');
let isActive = Symbol('active');

class User {
  //User constructor definition
  constructor(firstName, lastName, gender, userType, faculty, department) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.userType = userType;
    this.department = department;
    this.faculty = faculty;
    this[isActive] = true;

    this[id] = generateId(databaseHandler['users']); //Generates a new Id for this User

    this.save(); //Save this user to the user database
  }

  //Gets user's Id
  getId(user = this) {
    return user[id];
  }

  //Gets user's active status
  getActiveStatus(user = this) {
    return user[isActive];
  }

  //changes user's active status to false
  changeActiveStatus() {
    return (this[isActive] = false);
  }

  //This method saves user to the database
  save() {
    databaseHandler['users'].push(this);
  }

  //Updates user's details
  updatePersonalDetails(
    firstName = this.firstName,
    lastName = this.lastName,
    gender = this.gender,
    faculty = this.faculty,
    department = this.department
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.department = department;
    this.faculty = faculty;
  }

  //Enables user to delete own account
  delete() {
    const users = this.getUsers(); //Returns the collection of Users

    for (let index in users) {
      //Compare each user-Id with the user Id we are interested in.
      if (users[index].getId() === this.getId()) {
        users.splice(index, 1); //Using the splice method of Javascript to remove one user at a particular position(i.e at a particular index) of the users collection.

        return true; //returns true as a response
      }
    }
  }

  //Gets user's information as an object
  retrieveDetails() {
    const users = this.getUsers(); //Returns the collection of Users

    return users.find(user => user.getId() === this.getId());
  }
}

module.exports = User; //Export this class for external use
