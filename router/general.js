const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const mypromise=new Promise((resolve,reject)=>{

      resolve(books);

  });

  mypromise.then((books)=>{
    res.status(200).json(JSON.stringify(books));
  })
  .catch((error)=>{
    console.log("error");
  })
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;

  return res.status(200).json(JSON.stringify(books[isbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorName=req.params.author;
  const authorBooks = [];
  for (const bookKey in books) {
    const book = books[bookKey];
    if (book.author === authorName) {
      authorBooks.push(book);
    }
  }

  return res.status(200).json(JSON.stringify(authorBooks));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title=req.params.title;
  const titleBooks = [];
  for (const bookKey in books) {
    const book = books[bookKey];
    if (book.title === title) {
      titleBooks.push(book);
    }
  }
  return res.status(300).json(JSON.stringify(titleBooks));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  const book=books[isbn];
  
  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
