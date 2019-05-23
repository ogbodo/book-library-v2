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
```
Clone the Project
Make sure you have Node.js Installed
Install the jest framework for testing
npm init
npm install --save-dev jest

// change the value of test in scripts to jest in your package.json

{
  "scripts": {
    "test": "jest"
  }
}
To run all test cases: npm test
