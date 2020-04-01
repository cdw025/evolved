const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../db/user');

// Route paths are prepended with /auth

router.get('/', (req, res) => {
    res.json({
        message: 'locked'
    });
});

function validUser(user) {
    const validEmail = typeof user.email == 'string' &&
                        user.email.trim() !='';

    const validPassword = typeof user.password == 'string' &&
                        user.password.trim() !='' &&
                        user.password.trim().length >= 6;

    return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
    if(validUser(req.body)) {
        User
        .getOneByEmail(req.body.email)
        .then(user => {
            console.log('user', user);
            //If user not found
            if(!user) {
                //this is a unique email
                // hash password
                bcrypt.hash(req.body.password, 10)
                .then((hash) => {
                    const user = {
                        email: req.body.email,
                        password: hash,
                        created_at: new Date()
                    };

                    User
                    .create(user)
                    .then(id => {
                // redirect
                res.json({
                    id,
                    message: 'all good'
                });
                    });
                // insert user into db

                });
            } else {
                //email in use
                next(new Error('email in use'));
            }
        });
    } else {
        next(new Error('Invalid user'));
    }
});

router.post('/login', (req, res, next) => {
    if(validUser(req.body)) {
        //check to see if in DB
        User
        .getOneByEmail(req.body.email)
        .then(user => {
            console.log('user', user);
            if(user) {
                //compare password with hashed password
                bcrypt.compare(req.body.password, user.password)
                .then((result) => {
                    // if the passwords matched
                    if(result) {
                        // setting the 'set-cookie' header
                        const isSecure = req.app.get('env') === 'development';
                        res.cookie('user_id', user.id, {
                            httpOnly: true,
                            signed: true,
                            sameSite: 'strict'
                        });
                        res.json({
                            id: user.id,
                            message: 'Logged In!'
                        });
                    } else {
                        next(new Error('Invalid password'))
                    }

                });

            } else {
                next(new Error('Invalid login'));
            }
        });
    } else {
        next(new Error('Invalid Login'));
    }
});


module.exports = router;