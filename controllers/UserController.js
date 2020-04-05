var mongoose = require("mongoose");
var User= require("../models/User");

var userController = {};

// Show list of user
userController.list = function(req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/index", {users: users});
    }
  });
};

// Show user by id
userController.show = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/show", {user: user});
    }
  });
};

// Create new user
userController.create = function(req, res) {
  res.render("../views/users/create");
};

// Save new user
userController.save = function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/users/create");
    } else {
      console.log("Successfully created an user.");
      res.redirect("/users/show/"+user._id);
    }
  });
};


// Delete an user
userController.delete = function(req, res) {
 User.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("User deleted!");
      res.redirect("/users");
    }
  });
};

module.exports = userController;
