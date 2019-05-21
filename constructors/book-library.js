const databaseHandler = require('../databases/database'); //Import the database
const book = require('../constructors/book'); //Import the Book object
const catalog = require('../constructors/catalog'); //Import our helper function that generates unique IDs.

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
      newBook.getId(),
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
  addBookToCatalog(bookId, dateAdded, bookTitle) {
    //build the catalog for the current object and save it in the catalog collection
    const catalogRecord = new catalog(
      bookId,
      dateAdded,
      bookTitle,
      databaseHandler['catalog']
    );

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

  //This method takes record of book borrowed by users
  recordBookRelease(bookId) {
    return this.removeBookFromCatalog(bookId); //Gets the particular catalog record of a book
  }

  //Removes book from catalog
  removeBookFromCatalog(bookId) {
    const catalogs = databaseHandler['catalog']; //Retrieves catalog collection from the database

    for (let index in catalogs) {
      //Compare each book id with the book id we are interested in.
      if (catalogs[index].bookId === bookId) {
        catalogs.splice(index, 1); //This line removes one book from the catalog.
        return true; //Returns true for successful operation
      }
    }

    return false; //Returns false for unsuccessful operation
  }

  //This method gets a book
  get(bookId) {
    const books = this.getBooks(); //Returns the collection of books

    //Compare each book id with the book id we are interested in and return it when found.
    return books.find(book => book.getId() === bookId);
  }

  //This method deletes book from the library
  delete(bookId) {
    const books = this.getBooks(); //Returns the collection of books

    for (let index in books) {
      //Compare each book id with the book id we are interested in.
      if (books[index].getId() === bookId) {
        books.splice(index, 1); //Using the splice method of Javascript to remove one book at a particular position(i.e at a particular index) of the books collection.
        return true; //returns true as a response
      }
    }
    return 'Book Not Found'; //returns false as a response if book with such ID does not exist
  }
}
module.exports = BookLibrary;
