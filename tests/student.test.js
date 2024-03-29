const Student = require('../classes/student'); //Import the Student class
const Admin = require('../classes/admin'); //Import the Admin class

const student = new Student(
  'Solomon',
  'Izukerberg',
  '2041200015',
  'Male',
  'Science',
  'Mathematics',
  '200'
);

const admin = new Admin('Izuking', 'Ogbodo', 'Male');
const book1 = admin.addBook('What Women Want', 'Magazine', 'Treasure Ogbonna');
const book2 = admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');

//Functionalities of Student with respect to own account
describe('All about Student own account functionalities', () => {
  test('Student can be created', () => {
    expect(student.firstName).toBe('Solomon');
  });

  describe('Student details can be updated', () => {
    test('For the case of personal details', () => {
      student.updatePersonalDetails(
        'Ebuka',
        'Joshua',
        'Female',
        'Art',
        'Visual and Creative Art'
      );
      expect(student.firstName).toBe('Ebuka');
      expect(student.lastName).toBe('Joshua');
      expect(student.gender).toBe('Female');
      expect(student.faculty).toBe('Art');
      expect(student.department).toBe('Visual and Creative Art');
    });

    test('For the case of personal details updated with no argument', () => {
      //Everything remains the-same
      student.updatePersonalDetails();
      expect(student.firstName).toBe('Ebuka');
      expect(student.lastName).toBe('Joshua');
      expect(student.gender).toBe('Female');
      expect(student.faculty).toBe('Art');
      expect(student.department).toBe('Visual and Creative Art');
    });
  });

  test('Student details can be read', () => {
    expect(student.retrieveDetails()).toEqual(student);
  });
});

describe('Student borrowing book', () => {
  test('For the case where a student demands for book and its available', () => {
    expect(student.borrowBook(book2.getId()).userId).toBe(student.getId());
  });

  test('For the case where same student demands for another book and its available', () => {
    expect(student.borrowBook(book1.getId()).userId).toBe(student.getId());
  });

  test('For the case where same student demands for another copy of same book but its unavailable', () => {
    expect(student.borrowBook(book2.getId())).toBe('Book Taken');
  });

  test('For the case where student wants to return a book', () => {
    expect(student.returnBorrowedbook(book2.getId())).toBeTruthy();
  });
});
