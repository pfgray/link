var session = require('express-session');
var passport = require('passport');

var userModel = require('../../api/user/user.model.js');

var google = require('./google.js');
var email = require('./email.js');
var store = require('./sessions.js');

module.exports.init = function(app, config){
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        store
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    console.log('got url, first: ', config.getDomainUrl());

    google(app, config);
    email(app, config);

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};
