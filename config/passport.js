var LocalStrategy = require("passport-local").Strategy;
var User = require('../models/user');
var secret = process.env.DEVIGNER_APP_SECRET;
var jwt = require('jsonwebtoken');

module.exports = function(passport){

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'email' : email }, function(err, user) {
        // error
        if(err) return done(err, false, { message: "Ooops,  something went wrong 1." });

        // no error but already registered 
        if(user) return done(null, false, { message: "Please choose another email" });

        var newUser = new User();
        newUser.email = email;
        newUser.username = req.body.username;
        newUser.fullname = req.body.fullname;
        newUser.password = newUser.encrypt(password);

        newUser.save(function(err, user) {
          // if error
          if(err) return done(err, false, { message: "Ooops,  something went wrong 2." });

          // no errors
          return done(null, newUser);
        });
      });
    })
    // find a user with the email

  }));
}