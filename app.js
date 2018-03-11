const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const userRoute = require('./api/routes/user');
const User = require('./api/models/User');
let accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), {flags: 'a'}
);
mongoose.connect('mongodb://localhost:27017/Full-Stack-Database');
mongoose.connection.on('open', () => {
    console.log('connected to the database');
    // new User({
    //     email: 'user@gmail.com',
    //     password: 'pass'
    // }).save();
})
app.use(bodyParser.json());
app.use(morgan('common', {stream: accessLogStream}, {flags: 'a'}))
// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// })
app.use('/api/user', userRoute);
module.exports = app;