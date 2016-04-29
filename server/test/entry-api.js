// test entry api

'use strict';

var mysql = require('mysql');
var dbConfig = require('../secret/config-db.json');

// require bluebird to promisify mysql
var bluebird = require('bluebird');

var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

var Entry = require('../models/entry').Model(connPool);

var should = require('should');
var request = require('request-promise');
request = request.defaults({jar: true});


// allow for changing host to test prod server
var host = process.env.HOST || '127.0.0.1';

var baseUrl = 'http://' + host + '/api'; 

describe('api/entries', function() {
    
    describe('/api/entries (POST)', function() {
        
        before(function() {
            this.timeout(5000);
            var password = 'password';
            var options = {
                method: 'POST',
                uri: baseUrl + '/users',
                body: {email : 'ahudon1@uw.edu', firstName : 'Alyssa', lastName : 'Hudon', password1 : 'password', password2 : "password"},
                json: true
            }
            return request(options)
                .then(function(body) {
                    console.log(body);
                    body.should.have.ownProperty('success');
                })
                .then(function(body) {
                    var options2 = {
                        method: 'POST',
                        uri: baseUrl + '/login',
                        body: {email : 'ahudon1@uw.edu', password: 'password'},
                        json: true
                    }                
                    return request(options2)  
                })
                .then(function(body) {
                    body.should.have.ownProperty('success');
                });
        });
          
        it('should let users add a new entry', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/entries',
                body: {entryThought1 : "I'm grateful for my family", entryMood : "happy"},
                json: true
            }
            
            return request(options)
                .then(function(body) {
                    console.log(body);
                    body.should.have.ownProperty('success');
                })
                .then(function(body) {
                     return Entry.getInfo('entryMood', 'happy')
                })
                .then(function(body) {
                    console.log(body);
                });
        });
        
        it('should not let users add an empty entry', function() {
            var options = {
                method: 'POST',
                uri: baseUrl + '/entries',
                body: {entryMood : "happy"},
                json: true
            }
            
            return request(options)
                .then(function(body) {
                    console.log(body);
                    body.should.have.ownProperty('error');
                });
        });        
    });

    describe('/api/entries (GET)', function() {
        
        it('should allow users to see all of their entries');
        
        it('should not let allow users to view other user entries');
        
    });
     
});

describe('api/entries/{id}', function() {
    describe('api/entries/{id} (GET)', function() {
        it('should get the entry for that id');
    });
    
    describe('api/entries/{id} (PUT)', function() {
        it('should update the entry for that id');
    });
    
    describe('api/entries/{id} (DELETE)', function() {
        it('should remove the entry for that id');
    });
});

// delete user account after tests
after(function() {
    return connPool.queryAsync(`delete from user where email='ahudon1@uw.edu'`)
        .then(function(result) {
            console.log('in entry, deleted ' + result);
            return connPool.queryAsync(`delete from entry where entryThought1 ="I'm grateful for my family"`)
        })
        .then(function(result) {
            console.log(result);
        });
        
});
