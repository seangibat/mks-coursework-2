/**
 * AuthController.jsController
 *
 * @description :: Server-side logic for managing Authcontroller.js
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	
  login: function(req, res){
    User.findOneByEmail(req.body.email, function(err, user){
      if (err) return res.send(err);
      bcrypt.hash(req.body.password, user.salt, function(err, hash) {
        if (err) return res.send(err);

        if (user.password == hash){
          req.session.user = user;
          req.session.authenticated = true;
          res.send("Logged in.");
        }
        else {
          req.session.user = null;
          res.send("Couldn't log in.");
        }
      });
    });
  },

  logout: function(req, res){
    req.session.authenticated = false;
    res.view();
  }
};

