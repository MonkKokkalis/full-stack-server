const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const checkAuthentication = require('../authentication/auth-check');
router.get('/', checkAuthentication, (req, res) => {
    Book.find()
    .exec()
    .then(books => {
        const response = {
            count: books.length,
            books: books.map(book => {
                return {
                    title: book.title,
                    author: book.author,
                    price: book.price
                }
            })
        }
        res.status(200).json(
            response
        )
    })
    .catch(error => {
        console.log(error);
        res.status(500);
        res.json({
            error: error
        })
    })
})

module.exports = router;