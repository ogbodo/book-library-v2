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
describe('All about Teacher own account functionalities', () => {
  test('Teacher can be created', () => {
    expect(teacher.firstName).toBe('David');
  });

  describe('Teacher details can be updated', () => {
    test('For the case of personal details', () => {
      teacher.updatePersonalDetails(
        'Fola',
        'Tolu',
        'Male',
        'Science',
        'Biology',
        'Dev/09/340'
      );

      expect(teacher.firstName).toBe('Fola');
      expect(teacher.lastName).toBe('Tolu');
      expect(teacher.gender).toBe('Male');
      expect(teacher.faculty).toBe('Science');
      expect(teacher.department).toBe('Biology');
      expect(teacher.staffId).toBe('Dev/09/340');
    });
    test('For the case of personal details updated with no argument', () => {
      //Everything remains the-same
      teacher.updatePersonalDetails();
      expect(teacher.firstName).toBe('Fola');
      expect(teacher.lastName).toBe('Tolu');
      expect(teacher.gender).toBe('Male');
      expect(teacher.faculty).toBe('Science');
      expect(teacher.department).toBe('Biology');
      expect(teacher.staffId).toBe('Dev/09/340');
    });
  });

  test('Teacher details can be read', () => {
    expect(teacher.retrieveDetails()).toEqual(teacher);
  });
});

describe('Teacher borrowing book', () => {
  test('For the case where a teacher demands for book and its available', () => {
    expect(teacher.borrowBook(book1.getId()).userId).toBe(teacher.getId());
  });

  test('For the case where same teacher demands for another book and its available', () => {
    expect(teacher.borrowBook(book2.getId()).userId).toBe(teacher.getId());
  });

  test('For the case where same teacher demands for another copy of same book but its unavailable', () => {
    expect(teacher.borrowBook(book1.id)).toBe('Book Taken');
  });

  test('For the case where teacher wants to return a book', () => {
    expect(teacher.returnBorrowedbook(book2.getId())).toBeTruthy();
  });
});

test('Teacher account can be deleted', () => {
  expect(teacher.delete()).toBeTruthy();
});
