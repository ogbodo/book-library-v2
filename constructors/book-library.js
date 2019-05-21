const databaseHandler = require('../databases/database'); //Import the database
const book = require('../constructors/book'); //Import the Book object
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

//Book-Library class definition
class BookLibrary {
  //BookLibrary constructor definition
  constructor() {}

  //This method enables us to add new Book object into the book library
  create(title, category, author) {
    const newBook = new book(
      title,
      category,
      author,
      new Date().toLocaleDateString() //Gets and format today date
    );

    this.save(newBook); //Save this book in the book database

    this.addBookToCatalog(
      newBook.id,
      newBook.date,
      newBook.title,
      newBook.author
    ); //Record this new book in the catalog

    return newBook; //return the new book
  }

  //Method that saves book
  save(book) {
    databaseHandler['books'].push(book); //Returns all the book from the book database
  }

  //This method add books to catalog
  addBookToCatalog(bookId, dateAdded, title) {
    //build the catalog for the current object and save it in the catalog collection
    let id = Symbol('id');
    const catalogRecord = {
      id: generateId(databaseHandler['catalog']), //Generates a new Id for this catalog
      bookTitle: title,
      bookId: bookId,
      dateAdded: dateAdded,
      //This method returns the book's id
      getId: function() {
        return this[id];
      }
    };

    databaseHandler['catalog'].push(catalogRecord); //Adds this newly created catalog record into the catalog collection
  }

  //This method updates book title
  updateTitle(bookArg, newTitle) {
    const books = this.getBooks(); //Returns the collection of books
    for (let book of books) {
      //Compare each book id with the book id we are interested in.
      if (book.getId() === bookArg.getId()) {
        book.title = newTitle; //Performs the update here
        return book; //Returns the updated book.
      }
    }
  }

  //This method returns all books
  getBooks() {
    return databaseHandler['books']; //Gets the collection of books from the database.
  }
}
module.exports = BookLibrary;
