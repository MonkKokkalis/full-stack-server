const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
router.post('/sign-up', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            return res.status(409).json({
                error: 'Email already exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if(error) {
                    console.log(error);
                    return res.status(500).json({
                        error: 'the server has failed to process the request'
                    })
                } else {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: 'The user has been successfuly created'
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: 'The server has failed to save the user'
                        })
                    })                    
                }
            })
        }
    })
})

router.post('/sign-in', (req, res) => {
    User.find({email: req.body.email})
    .exec()
    .then((user) => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Authentication failed'
                })
            }
        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
            if(error) {
                return res.status(401).json({
                    message: 'Authentication failed, incorrect password'
                })
            }
            if(result) {
                const token = jwt.sign({
                    email: user[0].email
                },
                "secret",
                {
                    expiresIn: "1h"
                })
                return res.status(200).json({
                    message: "Authentication successful",
                    token: token
                })
            }
        })
        }
    )
})
module.exports = router;