const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});



// Original Method
// public_users.get('/',function (req, res) {
//   res.send(JSON.stringify(books,null));
// });

// Get book details based on ISBN

// Get the book list available in the shop
const getAllBooks = () => {
  return new Promise((resolve, reject) => resolve(books));
};

getAllBooks();

public_users.get("/", function (req, res) {
  res.send(JSON.stringify(books, null));
});


// Original Method
// public_users.get('/isbn/:isbn',function (req, res) {
//   const isbn = req.params.isbn
//   res.send(books[isbn])
//  });
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    let isbnNumber = parseInt(isbn);
    if (books[isbnNumber]) {
      resolve(books[isbnNumber]);
    } else {
      reject({ status: 404, message: `ISBN ${isbn} not found` });
    }
  });
};

getBookByISBN(1);

// Get Books
public_users.get("/isbn/:isbn", function (req, res) {
  getBookByISBN(req.params.isbn)
    .then((book) => res.send(JSON.stringify(book, null, 4)))
    .catch((err) => res.status(404).send(err));
});



//Original Method
// public_users.get("/author/:author", function (req, res) {
//   const author = req.params.author;
//   const booksbyAuthor = Object.values(books).filter((book) => {
//     return book.author === author;
//   });
//   res.send(booksbyAuthor);
// });

// Get Books By Author
const getBooksByAuthor = (author) => {
  return new Promise((resolve,reject)=>{
      let booksArray = Object.values(books);
      const book=booksArray.filter(book => book.author === author);
      if(book)
          resolve(book);
      else reject("Author not found");
   })
}

public_users.get('/author/:author',function (req, res) {
  getBooksByAuthor(req.params.author)
 .then(book => res.send(JSON.stringify(book,null,4)))
 .catch(err => res.status(404).send(err));
});





// Original Method
// public_users.get("/title/:title", function (req, res) {
//   const title = req.params.title;
//   const booksbyTitle = Object.values(books).filter((book) => {
//     return book.title === title;
//   });
//   res.send(booksbyTitle);
// });

// Get all books based on title
const getBookByTitle = (title) => {
  return new Promise((resolve,reject)=>{
      let booksArray = Object.values(books);
      const book=booksArray.filter(book => book.title === title);
      if(book)
          resolve(book);
      else reject("Title not found");
   })

}

public_users.get('/title/:title',function (req, res) {
 getBookByTitle(req.params.title)
 .then(book => res.send(JSON.stringify(book,null,4)))
 .catch(err => res.status(404).send(err));
});


//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;

