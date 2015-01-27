var UUID = require('uuid-js');
var users = require('../users.json');
var fs = require('fs');
var router = require('express').Router();
var jade = require('jade');

module.exports = function(app){
  router.get("/json", function(req,res){
    res.send(users);
  });

  router.get("/raw", function(req,res){
    fs.readFile('./views/users.jade', function(err, data){
      var html = jade.render(data.toString(), {users:users});
      res.type("text/plain");
      res.send(html);
    });
  });

  router.use("/:currentUser/:targetUser", function(req, res, next){
    var currentUser = users[req.params.currentUser];
    var targetUser = users[req.params.targetUser];
    if (currentUser.isActive && Math.abs(currentUser.index - targetUser.index) % 2 === 0){
      req.targetUser = targetUser;
      req.currentUser = currentUser;
    }
    else
      req.message = {message: "You cannot view this!"};
    next();
  });

  router.get("/:currentUser/:targetUser", function(req, res){
    if (req.message) return res.send(req.message);
    res.render('userViewingUser', {currentUser: req.currentUser, targetUser: req.targetUser});
  });

  router.get("/:currentUser/:targetUser/json", function(req, res){
    if (req.message) return res.send(req.message);
    res.json(req.targetUser);
  });

  router.get("/:currentUser/:targetUser/raw", function(req, res){
    if (req.message) return res.send(req.message);
    fs.readFile('./views/userViewingUser.jade', function(err, data){
      var html = jade.render(data.toString(), {currentUser: req.currentUser, targetUser: req.targetUser});
      res.type("text/plain");
      res.send(html);
    });
  });

  router.get("/:userId", function(req, res, next){
    if (req.params.userId >= users.length) next({ type: 'database', error: 'datacenter blew up' });;
    var user = users[req.params.userId];
    res.json(user);
  });

  router.route("/")
    .get(function(req, res){
      res.render('users', {users: users});
    })

    .post(function(req, res){
      var newUser = req.body;

      newUser.index = users.length;
      newUser._id = UUID.create().toString()
      newUser.guid = UUID.create().toString()
      users.push(newUser);
      var newFile = JSON.stringify(users);

      fs.writeFile('./users.json', newFile, function(err){
        if (err) return res.send(err);
        res.send("Success!")
      });
    });

  return router;
};