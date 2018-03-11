const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const userRoute = require('./api/routes/user');
const bookRoute = require('./api/routes/book');
const User = require('./api/models/User');
const Book = require('./api/models/Book');
let accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), {flags: 'a'}
);
mongoose.connect('mongodb://localhost:27017/Full-Stack-Database');
mongoose.connection.on('open', () => {
  
})
app.use(bodyParser.json());
app.use(morgan('common', {stream: accessLogStream}, {flags: 'a'}))

app.use('/api/books', bookRoute);
app.use('/api/user', userRoute);
module.exports = app;