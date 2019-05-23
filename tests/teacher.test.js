const Teacher = require('../classes/teacher'); //Import the Teacher class
const Admin = require('../classes/admin'); //Import the Admin class

const teacher = new Teacher(
  'David',
  'Mogbeyi',
  'Dev/1/340',
  'Male',
  'Science',
  'Computer Science'
);

const admin = new Admin('Izuking', 'Ogbodo', 'Male');
const book1 = admin.addBook('What Women Want', 'Magazine', 'Treasure Ogbonna');
const book2 = admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');

//Functionalities of Teacher with respect to own account
describe('All about Teacher own account functionalities', function() {
  test('Teacher can be created', function() {
    expect(teacher.firstName).toBe('David');
  });

  describe('Teacher details can be updated', function() {
    test('For the case of personal details', function() {
      teacher.updatePersonalDetails(
        'Fola',
        'Tolu',
        'Male',
        'Science',
        'Biology'
      );

      expect(teacher.firstName).toBe('Fola');
      expect(teacher.lastName).toBe('Tolu');
      expect(teacher.gender).toBe('Male');
      expect(teacher.faculty).toBe('Science');
      expect(teacher.department).toBe('Biology');
    });
  });

  test('Teacher details can be read', function() {
    expect(teacher.retrieveDetails()).toEqual(teacher);
  });
});

describe('Teacher borrowing book', function() {
  test('For the case where a teacher demands for book and its available', function() {
    expect(teacher.borrowBook(book1.getId()).userId).toBe(teacher.getId());
  });

  test('For the case where same teacher demands for another book and its available', function() {
    expect(teacher.borrowBook(book2.getId()).userId).toBe(teacher.getId());
  });

  test('For the case where same teacher demands for another copy of same book but its unavailable', function() {
    expect(teacher.borrowBook(book1.id)).toBe('Book Taken');
  });

  test('For the case where teacher wants to return a book', function() {
    expect(teacher.returnBorrowedbook(book2.id)).toBeTruthy();
  });
});

test('Teacher account can be deleted', function() {
  expect(teacher.delete()).toBeTruthy();
});
