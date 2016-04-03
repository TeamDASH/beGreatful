// set up server

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('./static/public'));

app.listen(80, function() {
    console.log('server is listening...');
});

