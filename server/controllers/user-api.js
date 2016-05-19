'use strict';

var validate = require('../config/validate');

var express = require('express');

var passport = require('passport');

module.exports.Router = function(User) {
    var router = express.Router();
    
    router.get('/login', function(req, res, next) {
        if (req.user) {
            res.json({success : 'User is logged in'});
        } else {
            res.json({error : 'User is not logged in'});
        }   
    });
    
     // requires email and password as POST parameters
     router.post('/login', function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password; 
        
        if (!email || !validate.validEmail(email)) {
            return res.json({error : 'Please enter valid email address'});
        } else if (!password || !validate.validField(password)) {
            return res.json({error : 'Please enter a password'});
        } 
           
        passport.authenticate('local', 
            function(err, user, info) {
                console.log('trying to use passport local auth');
                if (err) {
                    console.log('error logging in user'  + err);
                    return res.json({error : "It's our fault! Please come back later."});
                } else if (user == false) {
                    console.log('user value');
                    console.log(user);
                    console.log('no user like this');
                    return res.json({error : "Username and password do not match."});
                } else {
                    req.logIn(user, function(err) {
                        if (err) {
                            return res.json({error : 'Username and password do not match.'});
                        } 
                        if (req.isAuthenticated) {
                            console.log('logged in user');
                            return res.json({success : "Successfully authenticated."});
                        } else {
                            console.log('user not authenticated');
                            return res.json({error : 'Username and password do not match.'});
                        }
                    });
                }
            })(req, res, next);
        
    });
    
    // requires email, firstName, lastName, password1 and password2 as POST parameters
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
                req.logIn(user, function(err) {
                    if (err) {
                        return res.json({error : 'Username and password do not match.'});
                    } 
                    if (req.isAuthenticated) {
                        console.log('logged in user');
                        return res.json({success : "Successfully authenticated."});
                    } else {
                        console.log('user not authenticated');
                        return res.json({error : 'Username and password do not match.'});
                    }
                });
            }) 
            .catch(function(err) {
                return res.json({error : err});
            });   
    });

    // gets user profile information
    router.get('/users/me', function(req, res, next) {
        var user = req.user;
        delete user.password;
        res.json({user : user});
    });
    
    router.get('/users/:email', function(req, res, next) {
        var email = req.params.email;
        console.log(email);
        
        User.getInfo('email', email)
            .then(function(user) {
                if (user) {
                    res.json({error : 'We already have an account with that email address.'})
                } else {
                    res.json({success : 'Email is free!'})
                }
            })
    });
    
    // updates user profile information
    router.put('/users/me', function(req, res, next) {
        var password1 = req.body.password1;
        var password2 = req.body.password2;
        
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        
        var user = req.user;
        
        var response = {"success" : [], "error" : []};
        
        updateFirstName(firstName, user, response)
            .then(function(data) {
                console.log('successfully updated first name');
                res.json(response);
            })
            .catch(function(err) {
                res.json(response);
            })
            
        
        // if (validate.validPassword(password1, password2) || firstName || lastName) {
        //      if (validate.validPassword(password1, password2)) {
        //         User.updatePassword(user.userID, password1)
        //             .then(function() {
        //                 response.success.push("Password updated successfully.");
        //             })
        //             .catch(function(err) {
        //                 response.error.push("Failed to update password.");
        //             });
        //      }
             
        //      if (lastName) {
        //          return User.update(user.userID, 'lastName', lastName)
        //             .then(function() {
        //                 return response.success.push("Last name updated successfully.");
        //             })
        //             .catch(function() {
        //                 return response.error.push("Failed to update last name.");
        //             });
        //      }
        //      console.log('responding');
        //      res.json(response);
        // } else {
        //     res.json({error : 'Please enter a field to update.'})
        // }
    });
    
    function updateFirstName(firstName, user, response) {
        if (firstName) {
            return User.update(user.userID, 'firstName', firstName)
            .then(function() {
                console.log('updated first name');
                response.success.push("First name updated successfully.");
            })
            .catch(function(err) {
                console.log(err);
                response.error.push("Failed to update first name.");
            });
        }
    }
    
    function updateLastName(lastName, user, response) {
        if (lastName) {
            return User.update(user.userID, 'lastName', lastName)
            .then(function() {
                console.log('updated last name');
                response.success.push("Last name updated successfully.");
            })
            .catch(function(err) {
                console.log(err);
                response.error.push("Failed to update last name.");
            });
        }
    }
    
    return router;
}