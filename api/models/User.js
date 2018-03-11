const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        validate: validator.isEmail,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;