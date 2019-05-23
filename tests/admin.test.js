const Admin = require('../classes/admin'); //Import the Admin class
const Teacher = require('../classes/teacher'); //Import the Teacher class
const Student = require('../classes/student'); //Import the Student class

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
describe('All about Admin own account functionalities', () => {
  admin = new Admin('Matthias', ' Ogbonna', 'Male');

  test('Admin can be created', () => {
    expect(admin.firstName).toBe('Matthias');
  });

  describe('Admin details can be updated', () => {
    test('For the case of personal details', () => {
      admin.updatePersonalDetails('Natasha', 'Ade');
      expect(admin.firstName).toBe('Natasha');
      expect(admin.lastName).toBe('Ade');
    });
  });

  test('Admin details can be read', () => {
    expect(admin.retrieveDetails()).toEqual(admin);
  });
});

//Functionalities of Admin with respect to students and teachers
describe('All about Admin and other users', () => {
  describe('Admin can perform group search on all users', () => {
    test('For the case of Admin to get all teachers', () => {
      expect(admin.getAllTeachers()).toBeTruthy();
    });

    test('For the case of Admin to get all students', () => {
      expect(admin.getAllStudents()).toBeTruthy();
    });

    test('For the case of Admin to get all admins', () => {
      expect(admin.getAllAdmins()).toBeTruthy();
    });
  });

  describe('Admin can perform search on other users', () => {
    test('For the case student by id', () => {
      expect(admin.getUserByID(student.getId())).toEqual(student);
    });

    test('For the case teacher by id', () => {
      expect(admin.getUserByID(teacher.getId())).toEqual(teacher);
    });

    test('For the case of wrong id', () => {
      expect(admin.getUserByID('100')).toBeFalsy();
    });

    test('For the case teacher by first name', () => {
      expect(admin.searchUserByName('David')).toBeTruthy();
    });

    test('For the case teacher by last name', () => {
      expect(admin.searchUserByName('Mogbeyi')).toBeTruthy();
    });

    test('For the case student by first name', () => {
      expect(admin.searchUserByName('Lydia')).toBeTruthy();
    });

    test('For the case student by last name', () => {
      expect(admin.searchUserByName('John')).toBeTruthy();
    });

    test('For the case of wrong name', () => {
      expect(admin.searchUserByName('Josephat')).toBeFalsy();
    });
  });

  describe('Admin can read other users by Matric Number or Staff Id', () => {
    test('For the case of reading a student by Matric Number', () => {
      expect(admin.readStudent(student.matricNumber)).toEqual(student);
    });

    test('For the case of reading a teacher by staffId', () => {
      expect(admin.readTeacher(teacher.staffId)).toEqual(teacher);
    });

    test('For the case of reading a student by wrong Matric Number', () => {
      expect(admin.readStudent('111110000899')).toBeFalsy();
    });

    test('For the case of reading a teacher by wrong staffId', () => {
      expect(admin.readTeacher('dev/000/00018')).toBeFalsy();
    });
  });
});

//Functionalities of Admin with respect to the Library
describe('All about Admin as a librarian', () => {
  test('Admin can add new books into the library', () => {
    expect(
      admin.addBook('What Men Want', 'Journal', 'Izuking Ogbodo').title
    ).toBe('What Men Want');
  });

  describe('Admin can perform retrieval of books', () => {
    admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');

    test('Admin can get all books', () => {
      expect(admin.getAllBooks().length).toBe(6);
    });
  });

  describe('For the case where admin updates a book detail which has been borrowed', () => {
    const book = admin.addBook('The Cup', 'myth', 'Chichi Anita');

    test('For the case where a teacher demands for book and its available', () => {
      expect(teacher.borrowBook(book.getId()).bookTitle).toBe('The Cup');
    });

    test('Admin can update a book detials', () => {
      expect(admin.updateBookDetails(book, 'What I Need').title).toBe(
        'What I Need'
      );
      //Now the borrowed book details has being updated accordingly
      expect(book.title).toBe('What I Need');
    });
  });

  describe('Admin can perform lending of books', () => {
    const book = admin.addBook(
      'Become a Good Librarian',
      'Journal',
      'Mcan long'
    );

    test('For the case where admin demands for book and its available', () => {
      expect(admin.lendBook(admin, book.getId()).userId).toBe(admin.getId());
    });

    describe('Between Admin and two users', () => {
      describe('Priority between teacher and student users', () => {
        const book = admin.addBook('Security Tips', 'Article', 'Ben Mark');

        test('For the case where a student and teacher demands for a book and its available', () => {
          expect(
            admin.lendBook([student, teacher], book.getId()).userId
          ).toEqual(teacher.getId());
        });

        describe('Priority between teachers', () => {
          test('For the case where two teachers demands for a book and its available', () => {
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

        describe('Priority between students', () => {
          test('For the case where two students of same levels demands for a book and its available', () => {
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

      describe('Priority between Senior and Junior students', () => {
        const book = admin.addBook(
          'Computer Basics',
          'Textbook',
          'King Solomon'
        );

        test('For the case where two students of different levels demands for a book and its available', () => {
          expect(
            admin.lendBook([student, seniorStudent], book.getId()).userId
          ).toEqual(seniorStudent.getId());
        });
      });
    });

    describe('Between Admin and three or more users', () => {
      test('For the case where two teachers and a student demands for a book and its available', () => {
        const book = admin.addBook(
          'Security Tips Part 4',
          'Article',
          'Ben Mark'
        );

        expect(
          admin.lendBook([student, teacher, secondTeacher], book.getId()).userId
        ).toEqual(teacher.getId());
      });

      test('For the case where two student and a teacher demands for a book and its available', () => {
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

  describe('Admin can perform deletion of books', () => {
    test('Admin can delete a book', () => {
      const newBook = admin.addBook(
        'Chike the River',
        'Literature',
        'Chinuwa Achebe'
      );
      expect(admin.deleteBook(newBook.getId())).toBeTruthy();
    });
    test('Admin trying to delete a non existing book', () => {
      expect(admin.deleteBook(20)).toBe('Book Not Found');
    });

    test('Admin can delete all book', () => {
      expect(admin.deleteBooks()).toBe(0);
    });
  });
});

describe('Admin can delete users', () => {
  test('Admin trying to delete a non existing user', () => {
    expect(admin.deleteUser(100)).toBe('User Not Found');
  });

  test('For the case of deleting a student', () => {
    expect(admin.deleteUser(seniorStudent2.getId())).toBeTruthy();
  });

  test('For the case of deleting a teacher', () => {
    expect(admin.deleteUser(teacher.getId())).toBeTruthy();
  });

  test('For the case of deleting all teacher', () => {
    expect(admin.deleteAllTeachers()).toBeTruthy();
  });

  test('For the case of deleting all student', () => {
    expect(admin.deleteAllStudents()).toBeTruthy();
  });

  test('For the case where admin wants to get users when none exists', () => {
    expect(admin.getAllUsers().length).toBeFalsy();
  });

  describe('For the case where admin wants to delete users when none exists', () => {
    test('For the case of deleting all student', () => {
      expect(admin.deleteAllStudents()).toBeFalsy();
    });

    test('For the case of deleting all teacher', () => {
      expect(admin.deleteAllTeachers()).toBeFalsy();
    });
  });

  test('Admin account can be deleted', () => {
    expect(admin.delete()).toBeTruthy();
  });
});
