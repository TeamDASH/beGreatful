//set up passport strategies

var connPool;

var User = require('../models/user').Model(connPool);

var LocalStrategy = require('passport-local').Strategy; 

module.exports = function(passport, connectionPool) { 
    connPool = connectionPool;
    
    passport.serializeUser(function(user, done) {
        console.log('serializing user');
		done(null, user.userID);
    });
    
    passport.deserializeUser(function(userID, done) {
        console.log('trying to deserialize user');
        User.getInfo('userID', userID)
            .then(function(user) {
                if (user == null) {
                    var err = console.log('error deserializing user');    
                    done(err, user);
                } else {
                    done(null, user);
                }
            });
    });
     
       // set up local strategy 
    passport.use('local', new LocalStrategy({
        username: 'username',
        password: 'password',
        passReqToCallback : true
    }, 
    function(req, email, password, done) {
        console.log('in local strategy');
         User.getInfo('email', email) 
            .then(function(user) {
                if (user == null) {
                    console.log('error finding user ');
                    return done(null, false);
                }
                if (User.validPassword(password, user.password) && user) {
                    console.log('found user');
                    return done(null, user);
                } else {
                    console.log('wrong username or password');
                    return done(null, false);
                }  
            });
    }));
}