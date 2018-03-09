const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const User = require('./api/models/User');
let accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), {flags: 'a'}
);
mongoose.connect('mongodb://localhost:27017/Full-Stack-Database');
mongoose.connection.on('open', () => {
    console.log('connected to the database');
})
app.use(morgan('common', {stream: accessLogStream}, {flags: 'a'}))
app.get('/', (req, res) => {
    console.log('root url');
    res.send('root url');
})

module.exports = app;