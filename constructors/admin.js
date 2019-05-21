const user = require('./user'); //Import the User Object
const bookLibrary = require('./book-library'); //Import the book library
const databaseHandler = require('../databases/database'); //Import the database
const generateId = require('../helpers/id-generator'); //Import our helper function that generates unique IDs.

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
        users.splice(index, 1); //Using the splice method of Javascript to remove one user at a particular position(i.e at a particular index) of the users collection.
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

  //This method deletes users based on their user type: Teachers, Students or Admins
  deleteUsers(userType) {
    const users = Admin.prototype.getUsers(); //Returns the collection of Users

    let madeDeletion = false;

    for (let index in users) {
      //Compare each user-type with the user type we are interested in.
      if (users[index].userType === userType) {
        users.splice(index, 1); //Using the splice method of Javascript to remove one user at a particular position(i.e at a particular index) of the User collection.
        madeDeletion = true; // sets true as a response
      }
    }

    return madeDeletion; //Returns the response
  }

  //This method adds book to the library
  addBook(title, category, author) {
    return bookLibrary.prototype.create(title, category, author);
  }
  //This method updates book by title
  updateBookTitle(book, newTitle) {
    return bookLibrary.prototype.updateTitle(book, newTitle);
  }

  //This method gets all  books
  getAllBooks() {
    return bookLibrary.prototype.getBooks();
  }

  //This method implements the algorithm for borrowing out book
  lendBook(user, bookId) {
    //First checks if number of users requesting for the book is more than one by determining if user object is an array of user objects or not.
    console.log('bookId', bookId);

    if (user.constructor === Array) {
      user = this.prioritizeCollector(user); //Determine who to be considered first
    }

    var isAvailable = this.recordLendActivity(bookId); //Determine if the book is still available for borrow or not

    if (!isAvailable) {
      return 'Book Taken'; //At this point, the book is unavailable
    }

    var book = bookLibrary.prototype.get(bookId); //At this stage, we are sure that the book is till available, so just go ahead and returns the particular book
    console.log(book);

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
    let id = Symbol('id');
    var borrowedBook = {
      id: generateId(allBorrowedBooks), //Generates a new Id for this borrowed book
      bookTitle: book.title,
      author: book.author,
      bookId: book.id,
      dateIssued: dateIssued,
      userId: user.id,
      //This method returns the book's id
      getId: function() {
        return this[id];
      }
    };

    allBorrowedBooks.push(borrowedBook); //Adds the borrowedBook object to the collection of books borrowed

    return borrowedBook; //returns the borrowed book
  }
}

module.exports = Admin;
