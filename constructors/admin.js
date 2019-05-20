const user = require('./user'); //Import the User Object
const bookLibrary = require('./book-library'); //Import the book library
const inheritProperty = require('../helpers/inherit-property'); //Import for this object to enable inheritance
const databaseHandler = require('../database/database'); //Import the database
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//Admin constructor definition
function Admin(firstName, lastName, gender) {
  user.call(this, firstName, lastName, gender, 'ADMIN'); //To enable proper inheritance
}
