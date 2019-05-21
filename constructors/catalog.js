const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//The Catalog class definition
let id = Symbol('id');
class Catalog {
  //The Catalog object constructor definition
  constructor(bookId, dateAdded, title, collectors) {
    this[id] = generateId(collectors); //Generates a new Id for this catalog
    this.title = title;
    this.bookId = bookId;
    this.date = dateAdded;
  }

  //Gets catalog's Id
  getId(catalog = this) {
    return catalog[id];
  }
}
module.exports = Catalog; //Make this class available for external use by importation
