const user = require('./user'); //Import the User Object
const bookLibrary = require('./book-library'); //Import the book library
const inheritProperty = require('../helpers/inherit-property'); //Import for this object to enable inheritance
const databaseHandler = require('../database/database'); //Import the database
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//Admin constructor definition
function Admin(firstName, lastName, gender) {
  user.call(this, firstName, lastName, gender, 'ADMIN'); //To enable proper inheritance
}

//Make Admin inherits from User
inheritProperty(user, Admin);

//Get a user by id
Admin.prototype.getUserByID = function(id) {
  var users = this.getUsers(); //Returns the collection of Users

  for (var index = 0; index < users.length; index++) {
    //Compare each user id with the user id we are interested in and return it.
    if (users[index].id === id) return users[index];
  }

  return false; //Returns false if no user with such id exists
};