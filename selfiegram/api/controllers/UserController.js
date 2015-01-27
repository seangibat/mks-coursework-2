/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	signup: function(req, res){
    User.create({
      email: req.body.email,
      password: req.body.password
    }, function(err, user){
      if (err) return res.send(err);
      req.session.user = user;
      req.session.authenticated = true;
      res.send("Signed up!");
    });
  },

  addFollower: function(req, res){
    req.session.user.following.push(req.params.userId);
    req.session.user.save(function(err){
      if (err) return console.log(err);

      res.send("User added.");
    });
  },

  removeFollower: function(req, res){
    req.session.user.following = req.session.user.following.filter(function(user){
      return user.id !== req.params.userId;
    });
    req.session.user.save(function(err){
      if (err) return console.log(err);

      res.send("User removed.");
    });
  }

};

