const databaseHandler = require('../databases/database'); //Import the database
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//The Book class definition
let id = Symbol('id');
class Book {
  //The Book object constructor definition
  constructor(title, category, author, date) {
    this[id] = generateId(databaseHandler['books']); //Generates a new Id for this book
    this.title = title;
    this.category = category;
    this.author = author;
    this.date = date;
  }

  //Gets book's Id
  getId(book = this) {
    return book[id];
  }

  //This method updates book details
  update(title, category, author, dateUpdated) {
    this.title = title;
    this.category = category;
    this.author = author;
    this.date = dateUpdated;

    return this;
  }
}
module.exports = Book; //Make this class available for external use by importation
