const admin = require('../constructors/admin'); //Import the admin object
const teacher = require('../constructors/teacher'); //Import the teacher object
const student = require('../constructors/student'); //Import the student object

//Functionalities of admin with respect to own account
describe('All about admin own account functionalities', function() {
  test('admin can be created', function() {
    const admin = new admin('Izuking', 'Ogbodo', 'Male');
    expect(admin.getFirstName()).toBe('Izuking');
  });

  describe('admin details can be updated', function() {
    const admin = new admin('Treasure', ' Ogbonna', 'Female');

    test('For the case of personal details', function() {
      admin.updatePersonalDetails('Natasha', 'Ade');
      expect(admin.getFirstName()).toBe('Natasha');
      expect(admin.getLastName()).toBe('Ade');
    });
  });

  test('admin account can be deleted', function() {
    const admin = new admin('Matthias', ' King', 'Male');
    expect(admin.delete()).toBeTruthy();
  });

  test('admin details can be read', function() {
    const admin = new admin('Matthias ', 'Ogbonna', 'Male');
    expect(admin.retrieveDetails()).toEqual(admin);
  });
});

//Functionalities of admin with respect to students and teachers
describe('All about admin and other users', function() {
  describe('admin can perform group search on all users', function() {
    var admin = new admin('Matthias', ' Ogbonna', 'Male');

    test('For the case of admin to get all teachers', function() {
      expect(admin.getAllteachers()).toBeTruthy();
    });

    test('For the case of admin to get all students', function() {
      expect(admin.getAllstudents()).toBeTruthy();
    });

    test('For the case of admin to get all admins', function() {
      expect(admin.getAlladmins()).toBeTruthy();
    });

    test('For the case where admin wants to get users when none exists', function() {
      expect(admin.getAlladmins()).toBeTruthy();
    });
  });

  describe('admin can perform search on other users', function() {
    var admin = new admin('Matthias', ' Ogbonna', 'Male');

    var student = new student(
      'Solomon',
      'Izukerberg',
      '2041200015',
      'Male',
      'Science',
      'Mathematics',
      '200'
    );

    var teacher = new teacher(
      'David',
      'Mogbeyi',
      'Dev/1/340',
      'Male',
      'Science',
      'Computer Science'
    );

    test('For the case student by id', function() {
      expect(admin.getUserByID(student.id)).toEqual(student);
    });

    test('For the case teacher by id', function() {
      expect(admin.getUserByID(teacher.id)).toEqual(teacher);
    });

    test('For the case student by id', function() {
      expect(admin.getUserByID(student.id)).toEqual(student);
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
      expect(admin.searchUserByName('Solomon')).toBeTruthy();
    });

    test('For the case student by last name', function() {
      expect(admin.searchUserByName('Izukerberg')).toBeTruthy();
    });

    test('For the case of wrong name', function() {
      expect(admin.searchUserByName('Josephat')).toBeFalsy();
    });

    describe('admin can read other users by Matric Number or Staff Id', function() {
      var admin = new admin('Matthias', ' Ogbonna', 'Male');

      var student = new student(
        'Mary',
        'Godwin',
        '45302312004',
        'Femal',
        'Science',
        'Physics',
        '400'
      );

      var teacher = new teacher(
        'Adedayo',
        'Olagunju',
        'Dev/0012/4321',
        'Male',
        'Art',
        'English'
      );
      test('For the case of reading a student by Matric Number', function() {
        expect(admin.readstudent(student.matricNumber)).toEqual(student);
      });

      test('For the case of reading a teacher by staffId', function() {
        expect(admin.readteacher(teacher.staffId)).toEqual(teacher);
      });

      test('For the case of reading a student by wrong Matric Number', function() {
        expect(admin.readstudent('111110000899')).toBeFalsy();
      });

      test('For the case of reading a teacher by wrong staffId', function() {
        expect(admin.readteacher('dev/000/00018')).toBeFalsy();
      });
    });

    describe('admin can delete other users', function() {
      var admin = new admin('Matthias', ' Ogbonna', 'Male');

      var student = new student(
        'Lydia',
        'Habbiba',
        '90128780',
        'Femal',
        'Social Science',
        'Political Science',
        '100'
      );

      var teacher = new teacher(
        'Ashemole',
        'Mike',
        'Dev/98/0023',
        'Male',
        'Science',
        'Mathematics'
      );

      test('admin trying to delete a non existing user', function() {
        expect(admin.deleteUser(20)).toBe('User Not Found');
      });

      test('For the case of deleting a student', function() {
        expect(admin.deleteUser(student.id)).toBeTruthy();
      });

      test('For the case of deleting a teacher', function() {
        expect(admin.deleteUser(teacher.id)).toBeTruthy();
      });

      test('For the case of deleting all teacher', function() {
        expect(admin.deleteAllteachers()).toBeTruthy();
      });

      test('For the case of deleting all student', function() {
        expect(admin.deleteAllstudents()).toBeTruthy();
      });

      describe('For the case where admin wants to delete users when none exists', function() {
        test('For the case of deleting all student', function() {
          expect(admin.deleteAllstudents()).toBeTruthy();
        });

        test('For the case of deleting all teacher', function() {
          expect(admin.deleteAllteachers()).toBeFalsy();
        });
      });
    });
  });
});

//Functionalities of admin with respect to the Library
describe('All about admin as the librarian', function() {
  var admin = new admin('Matthias', ' Ogbonna', 'Male');

  test('admin can add new books into the library', function() {
    expect(
      admin.addBook('What Men Want', 'Journal', 'Izuking Ogbodo').title
    ).toBe('What Men Want');
  });

  describe('admin can perform retrieval of books', function() {
    var book = admin.addBook('Chike the River', 'Literature', 'Chinuwa Achebe');

    test('admin can get all books', function() {
      expect(admin.getAllBooks().length).toBe(5);
    });
  });

  test('admin can update a book title', function() {
    var newBook = admin.addBook(
      'Chike the River',
      'Literature',
      'Chinuwa Achebe'
    );
    expect(admin.updateBookTitle(newBook, 'What I Need').title).toBe(
      'What I Need'
    );
  });

  describe('admin can perform lending of books', function() {
    var book = admin.addBook('Become a Good Librarian', 'Journal', 'Mcan long');

    test('For the case where admin demands for book and its available', function() {
      expect(admin.lendBook(admin, book.id).userId).toBe(admin.id);
    });

    var student = new student(
      'Lydia',
      'Habbiba',
      '90128780',
      'Femal',
      'Social Science',
      'Political Science',
      '100'
    );

    var teacher = new teacher(
      'Ashemole',
      'Mike',
      'Dev/98/0023',
      'Male',
      'Science',
      'Mathematics'
    );

    describe('Between admin and two users', function() {
      describe('Priority between teacher and student users', function() {
        var book = admin.addBook('Security Tips', 'Article', 'Ben Mark');

        test('For the case where a student and teacher demands for a book and its available', function() {
          expect(admin.lendBook([student, teacher], book.id).userId).toEqual(
            teacher.id
          );
        });

        describe('Priority between teachers', function() {
          test('For the case where two teachers demands for a book and its available', function() {
            var book = admin.addBook(
              'Security Tips Part 2',
              'Article',
              'Ben Mark'
            );

            var secondteacher = new teacher(
              'Ayo',
              'James',
              'Dev/61/223',
              'Male',
              'Science',
              'Agric'
            );

            expect(
              admin.lendBook([teacher, secondteacher], book.id).userId
            ).toEqual(teacher.id);
          });
        });

        describe('Priority between students', function() {
          test('For the case where two students of same levels demands for a book and its available', function() {
            var book = admin.addBook(
              'Security Tips Part 3',
              'Article',
              'Ben Mark'
            );
            var firststudent = new student(
              'James',
              'John',
              '76600001',
              'Male',
              'Science',
              'Chemistry',
              '100'
            );
            var secondstudent = new student(
              'Lydia',
              'Habbiba',
              '2211123',
              'Femal',
              'Social Science',
              'Political Science',
              '100'
            );

            expect(
              admin.lendBook([firststudent, secondstudent], book.id).userId
            ).toEqual(firststudent.id);
          });
        });
      });

      describe('Priority between Senior and Junior students', function() {
        var juniorstudent = new student(
          'Lydia',
          'Habbiba',
          '90128780',
          'Femal',
          'Social Science',
          'Political Science',
          '100'
        );
        var seniorstudent = new student(
          'James',
          'John',
          '4522091',
          'Male',
          'Science',
          'Chemistry',
          '200'
        );
        var book = admin.addBook('Computer Basics', 'Textbook', 'King Solomon');

        test('For the case where two students of different levels demands for a book and its available', function() {
          expect(
            admin.lendBook([juniorstudent, seniorstudent], book.id).userId
          ).toEqual(seniorstudent.id);
        });
      });
    });

    describe('Between admin and three or more users', function() {
      var secondteacher = new teacher(
        'Ayo',
        'James',
        'Dev/61/223',
        'Male',
        'Science',
        'Agric'
      );
      test('For the case where two teachers and a student demands for a book and its available', function() {
        var book = admin.addBook('Security Tips Part 4', 'Article', 'Ben Mark');

        expect(
          admin.lendBook([student, teacher, secondteacher], book.id).userId
        ).toEqual(teacher.id);
      });

      test('For the case where two student and a teacher demands for a book and its available', function() {
        var book = admin.addBook('Security Tips Part 5', 'Article', 'Ben Mark');
        var seniorstudent = new student(
          'James',
          'John',
          '4522091',
          'Male',
          'Science',
          'Chemistry',
          '200'
        );

        expect(
          admin.lendBook([student, seniorstudent, secondteacher], book.id)
            .userId
        ).toEqual(secondteacher.id);
      });
    });
  });

  describe('admin can perform deletion of books', function() {
    test('admin can delete a book', function() {
      var newBook = admin.addBook(
        'Chike the River',
        'Literature',
        'Chinuwa Achebe'
      );
      expect(admin.deleteBook(newBook.id)).toBeTruthy();
    });
    test('admin trying to delete a non existing book', function() {
      expect(admin.deleteBook(20)).toBe('Book Not Found');
    });

    test('admin can delete all book', function() {
      expect(admin.deleteBooks()).toBe(0);
    });
  });
});
