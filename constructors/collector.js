const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//The Catalog class definition
let id = Symbol('id');
class Collector {
  //The Collector object constructor definition
  constructor(book, user, dateIssued, collection) {
    this[id] = generateId(collection); //Generates a new Id for this borrowed book
    this.bookTitle = book.title;
    this.author = book.author;
    this.bookId = book.getId();
    this.dateIssued = dateIssued;
    this.userId = user.getId();
  }

  //Gets collector's Id
  getId(collector = this) {
    return collector[id];
  }
}
module.exports = Collector; //Make this class available for external use by importation
