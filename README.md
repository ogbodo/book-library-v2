# Book Library V2
With the consistent use of ES6, Test Driven Development(TDD), and proper git flow throughout the project, 
I bring to you a mimi book Library where a student, teacher borrows books. When the copy
of the book is no longer in the library. The library should return "book
taken". They can be multiple copies of the same book in the library. The
books are given in a first-come-first-serve manner, but when a teacher
is requesting for the same book a student is requesting for, the teacher
comes first and when a junior student is asking for the same book a
senior student is asking for, the senior student comes first.
Admin serves as the Librarian.

### To setup and run the project

1. Clone the Project

2. Make sure you have Node.js Installed. Or you can download it [here](https://nodejs.org/en/download/)

3. To initialize this project, you will need to create a `package.json` by running the command `npm init`.
   This will begin the creation process and prompt you for a bunch of information about the project,       
   which you can simply keep pressing "enter" to use default values. Or, to create the `package.json`      
   without having to keep pressing enter, you can simply run `npm init --yes` or `npm init -y`.

4. In your project folder, you should see the `package.json`file. change the value of "test" property in the file to "jest" and save.
     i.e: `{ "scripts": { "test": "jest"} }`
              
5. To install jest, run `npm install --save-dev jest`
 
6. To run all test cases, run `npm test`
