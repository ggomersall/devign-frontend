var passport = require('passport');
var User = require('../models/user');
var secret = process.env.DEVIGNER_APP_SECRET;
var jwt = require('jsonwebtoken');

function signup(req, res, next ){
  var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
    if(err) return res.status(500).json({ message: err });
    if(info) return res.status(401).json({ message: info.message });
    if(!user) return res.status(401).json({ message: "User already exists!" });

    // User Authenticated to issue token
    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    // sedn token back to front-end
    return res.status(200).json({
      success: true,
      message: "Thanks for signing up!",
      token: token,
      user: user
    });
  });

  return localStrategy(req, res, next);
}

function login(req, res, next) {
  User.findOne({
    "email": req.body.email
  }, function(err, user) {
    if(err) return res.status(500).json(err);
    if(!user) return res.status(403).json({ message: 'No user found' });
    if (!user.validPassword(req.body.password)) return res.status(403).json({ message: "Login failed" });

    var token = jwt.sign(user, secret, {expiresIn: 60* 60* 24});

    return res.status(200).json({
      success: true,
      message: "Welcome!",
      token: token,
      user: user
    });
  });
};

module.exports = {
  login: login,
  signup: signup
}