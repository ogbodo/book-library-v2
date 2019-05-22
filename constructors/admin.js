const user = require('./user'); //Import the User Object
const bookLibrary = require('./book-library'); //Import the book library
const databaseHandler = require('../databases/database'); //Import the database
const collector = require('../constructors/collector'); //Import our helper function that generates unique IDs.

//Make Admin to inherit from User by using the extends key word
class Admin extends user {
  //Admin constructor definition
  constructor(firstName, lastName, gender) {
    super(firstName, lastName, gender, 'ADMIN'); //call the parent constructor with the required arguments
  }

  //Get a user by id
  getUserByID(id) {
    const users = this.getUsers(); //Returns the collection of Users

    return users.find(user => user.getId() === id); //Compare each user id with the user id we are interested in and return it.
  }
  //This method returns all users
  getUsers() {
    return databaseHandler['users'];
  }
  //Get all users with same either first-name or last-name
  searchUserByName(name) {
    const users = this.getUsers(); //Returns the collection of Users

    //Filter each user name based on the name we are interested in.
    const results = users.filter(
      user => user.firstName === name || user.lastName === name
    );

    return results.length === 0 ? false : results; //Returns false if no result found else returns true
  }

  //This method returns all teachers
  getAllTeachers() {
    return this.getUserSets('TEACHER');
  }

  //This method returns all students
  getAllStudents() {
    return this.getUserSets('STUDENT');
  }
  //This method returns all admins
  getAllAdmins() {
    return this.getUserSets('ADMIN');
  }
  //This method returns all users (students and teachers)
  getAllUsers() {
    return [
      ...this.getUserSets('TEACHER'),
      ...this.getUserSets('STUDENT')
    ].filter(user => user.getActiveStatus() === true);
  }

  //This method retrieves users based on their user type: Teachers, Students or Admins
  getUserSets(userType) {
    const users = Admin.prototype.getUsers(); //Returns the collection of Users

    return users.filter(user => user.userType === userType); //Filter users id based on the id we are interested in and return them.
  }

  //This method reads a student
  readStudent(matricNumber) {
    const users = this.getUsers(); //Returns the collection of Users
    return users.find(user => user.matricNumber === matricNumber); //Compare each user matric number with the matric number we are interested in and return it.
  }

  //This method reads a teacher
  readTeacher(staffId) {
    const users = this.getUsers(); //Returns the collection of Users
    return users.find(user => user.staffId === staffId); //Compare each user staff id with the staff id we are interested in and return it.
  }

  //This method deletes a user
  deleteUser(userId) {
    const users = this.getUsers(); //Returns the collection of Users

    for (let index in users) {
      if (users[index].getId() === userId) {
        // users.splice(index, 1); //Using the splice method of Javascript to remove one user at a particular position(i.e at a particular index) of the users collection.
        users.splice(index, 1);
        return true; //returns true as a response
      }
    }
    return 'User Not Found'; //returns user not found if user with such ID does not exist
  }

  //This method deletes all teachers
  deleteAllTeachers() {
    return this.deleteUsers('TEACHER');
  }

  //This method deletes all students
  deleteAllStudents() {
    return this.deleteUsers('STUDENT');
  }
  deleteNow(i, users) {
    users.splice(i, 1);
    console.log(' users.splice(index, 1)');
  }
  //This method deletes users based on their user type: Teachers, Students or Admins
  deleteUsers(userType) {
    const users = this.getUsers(); //Returns the collection of Users
    let wasDeletionMade = false;

    users.forEach(user => {
      if (user.userType === userType && user.getActiveStatus()) {
        user.changeActiveStatus();
        wasDeletionMade = true;
      }
    });

    return wasDeletionMade; //Returns the response
  }

  //This method adds book to the library
  addBook(title, category, author) {
    return bookLibrary.prototype.create(title, category, author);
  }
  //This method updates book by title
  updateBookDetails(book, title, category, author) {
    let updatedBook = bookLibrary.prototype.updateBook(
      book,
      title,
      category,
      author
    );

    //Check if the update went well
    if (updatedBook.title !== title) {
      //Return an error message
      return updatedBook;
    }

    let result = this.updateCollectorList(updatedBook); //Finally, apply this changes on all copies of this book in catalog record

    return result ? result : updatedBook; //Return the updated book if update went well else return the result value
  }

  //this method updates the collectors list
  updateCollectorList(updatedBook) {
    let response = false;

    //Iterate through the collectors
    for (let collector of databaseHandler['collectors']) {
      //Compare each collectors bookId with the id we are interested
      if (updatedBook.getId() === collector.bookId) {
        //Update every copies with the id we are interested
        collector.updateCollector(updatedBook.title, updatedBook.author);

        response = true;
      }
    }

    return response; //Return the update response
  }

  //This method gets all  books
  getAllBooks() {
    return bookLibrary.prototype.getBooks();
  }

  //This method implements the algorithm for borrowing out book
  lendBook(user, bookId) {
    //First checks if number of users requesting for the book is more than one by determining if user object is an array of user objects or not.

    if (user.constructor === Array) {
      user = this.prioritizeCollector(user); //Determine who to be considered first
    }

    var isAvailable = this.recordLendActivity(bookId); //Determine if the book is still available for borrow or not

    if (!isAvailable) {
      return 'Book Taken'; //At this point, the book is unavailable
    }

    var book = bookLibrary.prototype.get(bookId); //At this stage, we are sure that the book is till available, so just go ahead and returns the particular book

    // Just go ahead to complete the demand
    return this.completeBorrowProcess(book, user);
  }

  //Returns the person whose priority to be considered is high
  prioritizeCollector(users) {
    var rightPerson = users[0]; //Gets the first person from the array
    for (let user of users) {
      //Returns the right person to be consider
      rightPerson = this.getThePerson(rightPerson, user);
    }

    return rightPerson; //Returns the person considered
  }

  //Method that returns the user who should be considered
  getThePerson(firstPerson, secondPerson) {
    if (firstPerson.userType === 'TEACHER') {
      return firstPerson;
    }
    if (secondPerson.userType === 'TEACHER') {
      return secondPerson;
    }

    return this.getMaximumValue(firstPerson, secondPerson); //Compare between the two student who is the senior
  }

  //Method that returns the maximum value between two numbers
  getMaximumValue(firstPerson, secondPerson) {
    //Compares to see which person's level is greater
    if (firstPerson.level >= secondPerson.level) {
      return firstPerson;
    }

    return secondPerson;
  }

  //Records the borrowing activity
  recordLendActivity(bookId) {
    return bookLibrary.prototype.recordBookRelease(bookId);
  }

  //This method completes the borrow process
  completeBorrowProcess(book, user) {
    const allBorrowedBooks = databaseHandler['collectors']; //Returns the collection of collectors
    const dateIssued = new Date().toLocaleDateString(); //Gets and format today date

    //Object literal with both user and book information
    const borrowedBook = new collector(
      book,
      user,
      dateIssued,
      allBorrowedBooks
    );

    allBorrowedBooks.push(borrowedBook); //Adds the borrowedBook object to the collection of books borrowed

    return borrowedBook; //returns the borrowed book
  }

  //This method deletes a book
  deleteBook(book) {
    return bookLibrary.prototype.delete(book);
  }

  //This method deletes all books
  deleteBooks() {
    return bookLibrary.prototype.deleteAll();
  }
}

module.exports = Admin;
