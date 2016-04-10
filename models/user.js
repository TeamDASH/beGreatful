// model of the user table

'use strict';

var connPool;

var bluebird = require('bluebird');

var bcrypt = require('bcrypt');

bcrypt = bluebird.promisifyAll(bcrypt);

var rounds = 10; 

var user = {
    getInfo(attribute, value) {
        console.log('attribute' + attribute);
        console.log('value' + value);
        console.log('looking for user in database');
        var sql = 'select * from user where ??=?';
        return connPool.queryAsync(sql, [attribute, value])
            .then(function(rows) {
                console.log('trying to return something');
                console.log(rows);
                return rows.length > 0 ? rows[0] : null;
            });
    },
    insert(email, firstName, lastName, password) {
        console.log('user email ' + email);
        console.log('first name ' + firstName);
        console.log('last name ' + lastName);
        console.log('password ' + password);
        return user.generateHash(password)
            .then(function(data) {
                password = data;
            })
            .then(function() {
                console.log('trying to insert into database');
                var sql = `insert into user (email, firstName, lastName, password) values (?,?,?,?)`;
                var params = [email, firstName, lastName, password];
                return connPool.queryAsync(sql, params)
            })
            .then(function(result) {
                console.log('user inserted, trying to find user again');
                return user.getInfo('userID', result.insertId);
            })
            .catch(function(err) {
                console.log("error hashing password " + err);
            });
    },
    generateHash(password) {
        console.log('trying to generate password');
        return bcrypt.hashAsync(password, rounds) 
            .then(function(data) {
                console.log('done hashing password');
                console.log(data);
                return data;
            });
    },
    validPassword(password, userPassword) {
        return bcrypt.compare(password, userPassword, function(err, res) {
            if (err) {
                console.log('error comparing passwords ' + err);
            } 
            console.log('passwords compared successfully');
        });
    },
    update(userID, attribute, value) {
        var sql = 'update user set ??=? where userID = ?';
        console.log('user ID is ' + userID);
        console.log('attribute is ' + attribute);
        console.log('value ' + value);
        var params = [attribute, value, userID]
        return connPool.queryAsync(sql, params)
            .then(function() {
                return user.getInfo('userID', userID);
            });
    }
}

module.exports.Model = function(connectionPool) {
    connPool = connectionPool;
    return user;
}