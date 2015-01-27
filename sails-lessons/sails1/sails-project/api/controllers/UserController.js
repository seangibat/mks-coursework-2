/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  all: function(req, res){
    User.find(function(err, data){
      res.format({
        'text/plain': function(){
          res.type('text/plain');
          res.view({users: data});
        },

        'text/html': function(){
          res.view({users: data});
        },

        'application/json': function(){
          res.send(data);
        },

        'default': function() {
          res.view({users: data});
        }
      });
    });;
  },

  viewing: function(req, res){
    User.findOne(req.user1, function(err, data1){
      User.fineOne(req.user2, function(err, data2){
        res.format({
          'text/plain': function(){
            res.type('text/plain');
            res.view({user1: data1, user2: data2});
          },

          'text/html': function(){
            res.view({user1: data1, user2: data2});
          },

          'application/json': function(){
            res.send(data2);
          },

          'default': function() {
            res.view({user1: data1, user2: data2});
          }
        });
      });
    });
  }
};

