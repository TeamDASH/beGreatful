// routes

module.exports = function(app, passport, express) {
    
// signout route
app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/')
});

// look for files in static public directory
app.use(express.static('.'));
app.use(express.static('./app'));

// app.use('/libs', express.static('node_modules'));

// app.use(express.static('./app.static/public'));

// // check to make sure user is authenticated
// app.use(function(req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// });

// // look for files in static secure directory
// app.use(express.static('./client/app/static/secure'));

}
