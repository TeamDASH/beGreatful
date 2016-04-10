// test user api

'use strict';

var mysql = require('mysql');
var dbConfig = require('../secret/config-db.json');

// require bluebird to promisify mysql
var bluebird = require('bluebird');

var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

var User = require('../models/user').Model(connPool);

var should = require('should');
var request = require('request-promise');
request = request.defaults({jar: true});

// allow for changing host to test prod server
var host = process.env.HOST || '127.0.0.1';

var baseUrl = 'http://' + host + '/api';

var currPassword;
var currUsername; 

describe('/api/users', function() {
    describe('api/users (POST)', function() {
        it('should create a new user', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
            }
            return request(options)
                .then(function(body) {
                    body.should.have.ownProperty('success');
                    
                    // check that user info has been entered into database
                    return User.getInfo('email', 'alyssa@email.com')
                        .then(function(user) {
                            console.log('where is the username');
                            user.should.have.property('firstName', 'Alyssa');
                            user.should.have.property('lastName', 'Hudon');
                            user.should.have.property('email', 'ahudon@uw.edu');
                            var pass = User.validPassword(password1, user.password);
                            should(pass).ok;
                        });
                });
        });
        
        it('should not create a new user if the email is already taken', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
            }
            return request(options)
                .then(function(body) {
                    return body.should.have.ownProperty('error');
                });
        });
        
        it('should return an error if given invalid email', function() {
          var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                body: {email : 'ahudonuw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
          }
          return request(options) 
            .then(function(body) {
                console.log(body.error);
                return body.should.have.ownProperty('error');
            });       
        });

        it('should return an error if given no email', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                    body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
            }
            return request(options) 
            .then(function(body) {
                console.log(body.error);
                return body.should.have.ownProperty('error');
            });       
        });
        
        it('should return an error if given invalid username', function() {
            var options = {
                    method: 'POST',
                    uri: baseUrl + '/users',
                    body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                    json: true
            }
            return request(options) 
                .then(function(body) {
                    console.log(body.error);
                    return body.should.have.ownProperty('error');
                });       
        });

        it('should return an error if given no username', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                    body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
            }
            return request(options) 
                .then(function(body) {
                    console.log(body.error);
                    return body.should.have.ownProperty('error');
                });       
        });
        
        it('should return an error if given invalid password', function() {
            var options = {
                    method: 'POST',
                    uri: baseUrl + '/users',
                    body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                    json: true
            }
            return request(options) 
                .then(function(body) {
                    console.log(body.error);
                    return body.should.have.ownProperty('error');
                });       
        });

        it('should return an error if given no password1', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                    body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
            }
            return request(options) 
                .then(function(body) {
                    console.log(body.error);
                    return body.should.have.ownProperty('error');
                });       
        });
        
        it('should return an error if given no password2', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                    body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
            }
            return request(options) 
                .then(function(body) {
                    console.log(body.error);
                    return body.should.have.ownProperty('error');
                });       
        });
        
        it('should return an error if given passwords do not match', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                    body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
            }
            return request(options) 
                .then(function(body) {
                    console.log(body.error);
                    return body.should.have.ownProperty('error');
                });
        });       
    });
}); 

describe('/api/users/me', function() {
    describe('api/users/me (GET)', function() {
        it('should show user information');
        it('should not show information for other users');
    });
    
    describe('api/users/me (PUT)', function() {
        it('should update user information');  
    });
    
    describe('api/users/me (DELETE)', function() {
        it('should remove the user account');
    });
});
