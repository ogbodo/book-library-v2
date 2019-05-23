const Admin = require('../constructors/admin'); //Import the Admin object
const Teacher = require('../constructors/teacher'); //Import the Teacher object
const Student = require('../constructors/student'); //Import the Student object

let admin;

const student = new Student(
  'Lydia',
  'Habbiba',
  '90128780',
  'Female',
  'Social Science',
  'Political Science',
  '100'
);
const seniorStudent = new Student(
  'James',
  'John',
  '4522091',
  'Male',
  'Science',
  'Chemistry',
  '200'
);
const seniorStudent2 = new Student(
  'Oguche',
  'Ayo',
  '882210',
  'Female',
  'Science',
  'Agric',
  '200'
);

const teacher = new Teacher(
  'David',
  'Mogbeyi',
  'Dev/1/340',
  'Male',
  'Science',
  'Computer Science'
);

const secondTeacher = new Teacher(
  'Ayo',
  'James',
  'Dev/61/223',
  'Male',
  'Science',
  'Agric'
);

//Functionalities of Admin with respect to own account
describe('All about Admin own account functionalities', function() {
  admin = new Admin('Matthias', ' Ogbonna', 'Male');

  test('Admin can be created', function() {
    expect(admin.firstName).toBe('Matthias');
  });

  describe('Admin details can be updated', function() {
    test('For the case of personal details', function() {
      admin.updatePersonalDetails('Natasha', 'Ade');
      expect(admin.firstName).toBe('Natasha');
      expect(admin.lastName).toBe('Ade');
    });
  });

  test('Admin details can be read', function() {
    expect(admin.retrieveDetails()).toEqual(admin);
  });
});

//Functionalities of Admin with respect to students and teachers
describe('All about Admin and other users', function() {
  describe('Admin can perform group search on all users', function() {
    test('For the case of Admin to get all teachers', function() {
      expect(admin.getAllTeachers()).toBeTruthy();
    });

    test('For the case of Admin to get all students', function() {
      expect(admin.getAllStudents()).toBeTruthy();
    });

    test('For the case of Admin to get all admins', function() {
      expect(admin.getAllAdmins()).toBeTruthy();
    });
  });

  describe('Admin can perform search on other users', function() {
    test('For the case student by id', function() {
      expect(admin.getUserByID(student.getId())).toEqual(student);
    });

    test('For the case teacher by id', function() {
      expect(admin.getUserByID(teacher.getId())).toEqual(teacher);
    });

    test('For the case of wrong id', function() {
      expect(admin.getUserByID('100')).toBeFalsy();
    });

    test('For the case teacher by first name', function() {
      expect(admin.searchUserByName('David')).toBeTruthy();
    });

    test('For the case teacher by last name', function() {
      expect(admin.searchUserByName('Mogbeyi')).toBeTruthy();
    });

    test('For the case student by first name', function() {
      expect(admin.searchUserByName('Lydia')).toBeTruthy();
    });

    test('For the case student by last name', function() {
      expect(admin.searchUserByName('John')).toBeTruthy();
    });

    test('For the case of wrong name', function() {
      expect(admin.searchUserByName('Josephat')).toBeFalsy();
    });
  });

  describe('Admin can read other users by Matric Number or Staff Id', function() {
    test('For the case of reading a student by Matric Number', function() {
      expect(admin.readStudent(student.matricNumber)).toEqual(student);
    });

    test('For the case of reading a teacher by staffId', function() {
      expect(admin.readTeacher(teacher.staffId)).toEqual(teacher);
    });

    test('For the case of reading a student by wrong Matric Number', function() {
      expect(admin.readStudent('111110000899')).toBeFalsy();
    });

    test('For the case of reading a teacher by wrong staffId', function() {
      expect(admin.readTeacher('dev/000/00018')).toBeFalsy();
    });
  });
});

//Functionalities of Admin with respect to the Library
describe('All about Admin as a librarian', function() {
  test('Admin can add new books into the library', function() {
    expect(
      admin.addBook('What Men Want', 'Journal', 'Izuking Ogbodo').title
    ).toBe('What Men Want');
  });

  describe('Admin can perform retrieval of books', function() {
    admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');

    test('Admin can get all books', function() {
      expect(admin.getAllBooks().length).toBe(5);
    });
  });

  test('Admin can update a book detials', function() {
    const newBook = admin.addBook(
      'Chike the River',
      'Literature',
      'Chinuwa Achebe'
    );
    expect(admin.updateBookDetails(newBook, 'What I Need').title).toBe(
      'What I Need'
    );
  });

  describe('Admin can perform lending of books', function() {
    const book = admin.addBook(
      'Become a Good Librarian',
      'Journal',
      'Mcan long'
    );

    test('For the case where admin demands for book and its available', function() {
      expect(admin.lendBook(admin, book.getId()).userId).toBe(admin.getId());
    });

    describe('Between Admin and two users', function() {
      describe('Priority between teacher and student users', function() {
        const book = admin.addBook('Security Tips', 'Article', 'Ben Mark');

        test('For the case where a student and teacher demands for a book and its available', function() {
          expect(
            admin.lendBook([student, teacher], book.getId()).userId
          ).toEqual(teacher.getId());
        });

        describe('Priority between teachers', function() {
          test('For the case where two teachers demands for a book and its available', function() {
            const book = admin.addBook(
              'Security Tips Part 2',
              'Article',
              'Ben Mark'
            );

            expect(
              admin.lendBook([teacher, secondTeacher], book.getId()).userId
            ).toEqual(teacher.getId());
          });
        });

        describe('Priority between students', function() {
          test('For the case where two students of same levels demands for a book and its available', function() {
            const book = admin.addBook(
              'Security Tips Part 3',
              'Article',
              'Ben Mark'
            );

            expect(
              admin.lendBook([seniorStudent, seniorStudent2], book.getId())
                .userId
            ).toEqual(seniorStudent.getId());
          });
        });
      });

      describe('Priority between Senior and Junior students', function() {
        const book = admin.addBook(
          'Computer Basics',
          'Textbook',
          'King Solomon'
        );

        test('For the case where two students of different levels demands for a book and its available', function() {
          expect(
            admin.lendBook([student, seniorStudent], book.getId()).userId
          ).toEqual(seniorStudent.getId());
        });
      });
    });

    describe('Between Admin and three or more users', function() {
      test('For the case where two teachers and a student demands for a book and its available', function() {
        const book = admin.addBook(
          'Security Tips Part 4',
          'Article',
          'Ben Mark'
        );

        expect(
          admin.lendBook([student, teacher, secondTeacher], book.getId()).userId
        ).toEqual(teacher.getId());
      });

      test('For the case where two student and a teacher demands for a book and its available', function() {
        const book = admin.addBook(
          'Security Tips Part 5',
          'Article',
          'Ben Mark'
        );

        expect(
          admin.lendBook([student, seniorStudent, secondTeacher], book.getId())
            .userId
        ).toEqual(secondTeacher.getId());
      });
    });
  });

  describe('Admin can perform deletion of books', function() {
    test('Admin can delete a book', function() {
      const newBook = admin.addBook(
        'Chike the River',
        'Literature',
        'Chinuwa Achebe'
      );
      expect(admin.deleteBook(newBook.getId())).toBeTruthy();
    });
    test('Admin trying to delete a non existing book', function() {
      expect(admin.deleteBook(20)).toBe('Book Not Found');
    });

    test('Admin can delete all book', function() {
      expect(admin.deleteBooks()).toBe(0);
    });
  });
});

describe('Admin can delete users', function() {
  test('Admin trying to delete a non existing user', function() {
    expect(admin.deleteUser(100)).toBe('User Not Found');
  });

  test('For the case of deleting a student', function() {
    expect(admin.deleteUser(seniorStudent2.getId())).toBeTruthy();
  });

  test('For the case of deleting a teacher', function() {
    expect(admin.deleteUser(teacher.getId())).toBeTruthy();
  });

  test('For the case of deleting all teacher', function() {
    expect(admin.deleteAllTeachers()).toBeTruthy();
  });

  test('For the case of deleting all student', function() {
    expect(admin.deleteAllStudents()).toBeTruthy();
  });

  test('For the case where admin wants to get users when none exists', function() {
    expect(admin.getAllUsers().length).toBeFalsy();
  });

  describe('For the case where admin wants to delete users when none exists', function() {
    test('For the case of deleting all student', function() {
      expect(admin.deleteAllStudents()).toBeFalsy();
    });

    test('For the case of deleting all teacher', function() {
      expect(admin.deleteAllTeachers()).toBeFalsy();
    });
  });

  test('Admin account can be deleted', function() {
    expect(admin.delete()).toBeTruthy();
  });
});
