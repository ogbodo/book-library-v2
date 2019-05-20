const user = require('./user'); //Import the User Object
// const bookLibrary = require('./book-library'); //Import the book library
const inheritProperty = require('../helpers/inherit-property'); //Import for this object to enable inheritance
// const databaseHandler = require('../database/database'); //Import the database
// const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//Admin constructor definition
function Admin(firstName, lastName, gender) {
  user.call(this, firstName, lastName, gender, 'ADMIN'); //To enable proper inheritance
}

//Make Admin inherits from User
inheritProperty(user, Admin);

//Get a user by id
Admin.prototype.getUserByID = function(id) {
  const users = this.getUsers(); //Returns the collection of Users

  return users.find(user => user.id === id); //Compare each user id with the user id we are interested in and return it.
};

//Get all users with same either first-name or last-name
Admin.prototype.searchUserByName = function(name) {
  const users = this.getUsers(); //Returns the collection of Users

  //Compare each user id with the user id we are interested in.
  let results = users.map(
    user => user.firstName === name || user.lastName === name
  );

  return results.length === 0 ? false : results; //Returns false if no result found else returns true
};
module.exports = Admin;
