const databaseHandler = require('../databases/database'); //Import the database
const book = require('../classes/book'); //Import the Book object
const catalog = require('../classes/catalog'); //Import our helper function that generates unique IDs.

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
  addBookToCatalog(id, date, title) {
    //build the catalog for the current object and save it in the catalog collection
    const catalogRecord = new catalog(
      id,
      date,
      title,
      databaseHandler['catalog']
    );

    databaseHandler['catalog'].push(catalogRecord); //Adds this newly created catalog record into the catalog collection
  }

  updateCatalog(updatedBook) {
    let response;
    //Iterate through the catalog
    for (let catalog of databaseHandler['catalog']) {
      //Compare each catalog bookId with the id we are interested
      if (updatedBook.getId() === catalog.bookId) {
        //Update every copies with the id we are interested
        catalog.updateCatalog(updatedBook.title, updatedBook.date);
        response = true;
      }
    }
    return response; //Return the update response
  }

  //This method updates book title
  updateBook(bookToBeUpdated, title, category, author) {
    let updatedBook = bookToBeUpdated.update(
      title,
      category,
      author,
      new Date().toLocaleDateString()
    );
    let isUpdateSuccessful = this.updateCatalog(updatedBook); //Apply this changes on all copies of this book in catalog record

    //Check if the update went well
    if (!isUpdateSuccessful) {
      //Return an error message
      return `Unable to update catalog, maybe ${
        bookToBeUpdated.title
      } was not cataloged`;
    }

    return updatedBook;
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
    return `Book Not Found`; //returns false as a response if book with such ID does not exist
  }

  //This method deletes all books
  deleteAll() {
    const books = this.getBooks(); //Returns the collection of books
    books.splice(0); //Using the splice method of Javascript to remove books from start to end(i.e from index 0 to last index) of the books collection.
    return books.length; //Returns the new length of the collection of books (which obviously will be 0 at this point)
  }

  //This method makes record of book returned by users
  recordBookReturned(bookId) {
    return this.removeBookFromCatalog(bookId); //Removes the particular book from the catalog collection
  }
}
module.exports = BookLibrary;
