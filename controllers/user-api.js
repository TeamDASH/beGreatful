'use strict';

var validate = require('../config/validate');

var express = require('express');

module.exports.Router = function(User, Account) {
    var router = express.Router();
    
    router.post('/users', function(req, res, next) {
        var email = req.body.email;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password1 = req.body.password1; 
        var password2 = req.body.password2;
        
        if (!email || !validate.validEmail(email)) {
            return res.json({error : 'Please enter valid email address'});
        } else if (!req.body.firstName || !validate.validField(firstName)) {
            return res.json({error : 'Please enter a first name'});
        } else if (!req.body.lastName || !validate.validField(lastName)) {
            return res.json({error: 'Please enter a last name'});
        } else if (!password1 || !password2 || !validate.validPassword(password1, password2)) {
            return res.json({error : 'Please enter a password longer than 8 characters and make sure passwords match.'});
        }
        console.log('creating account');
        User.getInfo('email', email) 
            .then(function(result) {
                if (result !== null) {
                    console.log('A user already has that email');
                    throw "That email is taken! Please enter a different email address.";
                } else {
                    console.log('did not find a user with that email');
                    return User.insert(email, firstName, lastName, password1);
                }
            })
            .then(function(user) {
                console.log('back in api');
                console.log(user);
                if (user) {
                    return res.json({success : 'User account created'});
                }
                // login with passport here
            }) 
            .catch(function(err) {
                return res.json({error : err});
            });   
    });
    
    return router;
}