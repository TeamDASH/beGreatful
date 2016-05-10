// routes
var path = require('path');

module.exports = function(app, passport, express) {

app.use(express.static('./client'));

// signout route
app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/')
});

}
