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
var dbConfig = require('./server/secret/config-db.json');
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

// require passport config
require('./server/config/passport')(passport, connPool)

// cookie secret
var cookieSigSecret = require('./server/secret/cookie-secret.json').secret;

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

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// require controllers
var userApi = require('./server/controllers/user-api');
var entryApi = require('./server/controllers/entry-api')

// require models 
var user = require('./server/models/user').Model(connPool);
var entry = require('./server/models/entry').Model(connPool);

// require api routes
app.use('/api', userApi.Router(user));
app.use('/api', entryApi.Router(entry));

// require other routes
require('./server/config/routes')(app, passport, express);

app.listen(80, function() {
    console.log('server is listening...');
});

