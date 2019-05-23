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

      teacher.updateStaffId('Dev/09/3332');
      expect(teacher.getFirstName()).toBe('Fola');
      expect(teacher.getLastName()).toBe('Tolu');
      expect(teacher.gender).toBe('Male');
      expect(teacher.faculty).toBe('Science');
      expect(teacher.department).toBe('Biology');
      expect(teacher.staffId).toBe('Dev/09/3332');
    });
  });

  test('Teacher details can be read', function() {
    expect(teacher.retrieveDetails()).toEqual(teacher);
  });

  test('Teacher account can be deleted', function() {
    expect(teacher.delete()).toBeTruthy();
  });
});
