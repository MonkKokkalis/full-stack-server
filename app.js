const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const userRoute = require('./api/routes/user');
const fileRoute = require('./api/routes/files');
const bookRoute = require('./api/routes/book');
const downloadRoute = require('./api/routes/download');
const User = require('./api/models/User');
const Book = require('./api/models/Book');
let accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), {flags: 'a'}
);
mongoose.connect('mongodb://localhost:27017/Full-Stack-Database');
mongoose.connection.on('open', () => {
  
})
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Expose-Headers', 'X-Token, Content-Disposition, FileName')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})
app.use(morgan('common', {stream: accessLogStream}, {flags: 'a'}))
// app.use('/files', express.static('files'))
app.use('/api/books', bookRoute);
app.use('/api/user', userRoute);
app.use('/api/files', fileRoute);
app.use('/api/download', downloadRoute);
module.exports = app;