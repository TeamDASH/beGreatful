// test login api

'use strict';

var mysql = require('mysql');
var dbConfig = require('../secret/config-db.json');

// require bluebird to promisify mysql
var bluebird = require('bluebird');

var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

var should = require('should');
var request = require('request-promise');
request = request.defaults({jar: true});

// allow for changing host to test prod server
var host = process.env.HOST || '127.0.0.1';

var baseUrl = 'http://' + host + '/api';

before(function() {
    var password = 'password';
    var options = {
        method: 'POST',
        uri: baseUrl + '/users',
        body: {email : 'ahudon@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
        json: true
    }
    return request(options)
        .then(function(body) {
            body.should.have.ownProperty('success');
        });
});

describe('/api/login (POST)', function() {
    it.only('should log a user with valid credentials in', function() {
        var options = {
            method: 'POST',
            uri: baseUrl + '/login',
            body: {email : 'ahudon@uw.edu', password: 'password'},
            json: true
        }
        
        return request(options)
            .then(function(body) {
                body.should.have.ownProperty('success');
            });
    });
    
    it('should return an error if no email was submitted', function() {
        var options = {
            method: 'POST',
            uri: baseUrl + '/login',
            body: {password: 'password'},
            json: true
        }
        
        return request(options)
            .then(function(body) {
                body.should.have.ownProperty('error');
            });
    });
    
    it('should return an error if no password was submitted', function() {
        var options = {
            method: 'POST',
            uri: baseUrl + '/login',
            body: {email : 'ahudon@uw.edu'},
            json: true
        }
        
        return request(options)
            .then(function(body) {
                body.should.have.ownProperty('error');
            });
    });
    
    it('should return an error if the user submits invalid credentials', function() {
        var options = {
            method: 'POST',
            uri: baseUrl + '/login',
            body: {email : 'ahudon@uw.edu', password: 'passwords'},
            json: true
        }
        
        return request(options)
            .then(function(body) {
                body.should.have.ownProperty('error');
            });
    });
});

// delete user account after tests
after(function() {
    return connPool.queryAsync(`delete from user where email='ahudon@uw.edu'`)
        .then(function(result) {
        console.log('deleted user ' + result);
    });
});