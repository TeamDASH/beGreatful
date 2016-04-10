// set up server

"use strict";

// import modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var bluebird = require('bluebird');
var RedisStore = require('connect-redis')(session);

// configure mysql
var mysql = require('mysql');
var dbConfig = require('./secret/config-db.json');
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

// cookie secret
var cookieSigSecret = require('./secret/cookie-secret.json').secret;

// set up express
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({ 
    secret: cookieSigSecret,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore()
}));

console.log('set up session');
// set up passport
app.use(passport.initialize());
app.use(passport.session());

console.log('set up passport');
// require controllers
var userApi = require('./controllers/user-api');

// require models 
var user = require('./models/user').Model(connPool);

console.log('about to set up api route');
// require api routes
app.use('/api', userApi.Router(user));

console.log('set up api route');
// require other routes
require('./controllers/routes.js')(app, passport, express);

app.listen(80, function() {
    console.log('server is listening...');
});
