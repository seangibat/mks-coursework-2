/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    salt: {
      type: 'string'
    },
    followers: {
      collection: 'user',
      via: 'id'
    }
  },

  beforeCreate: function(values, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return cb(err);
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return cb(err);
        values.password = hash;
        values.salt = salt;
        cb();
      });
    });
  }

};


// TODO: CHANGE DBS TO ENFORCE UNIQUENESS

