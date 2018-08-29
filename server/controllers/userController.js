const db = require("../models");

// GET /api/users
function index(req, res) {
    // access database and pull out all users
    db.user.find({}, function(err, allUsers) {
      if (err) {
        console.log("error", err);
      }
      res.json(allUsers);
    });
  }

// POST /api/users/si
function signup(req, res) {
    db.user.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else if (foundUser) {
        console.log("User Already Exists:", foundUser);
        res.status(400).send("User Already Exists");
      } else {
        db.User.create(req.body, function(err, user) {
          if (err) {
            console.log("error", err);
          }
          res.status(200).json(user);
        });
      }
    });
  }

  //login function
function login(req, res) {
    db.user.findOne(
      { username: req.body.email, password: req.body.password },
      function(err, foundUser) {
        if (err) {
          return err;
        }
        if (foundUser) {
          console.log("in if", foundUser);
          res.status(200).json(foundUser);
        } else {
          console.log("in else");
          res.status(404).send("not found");
        }
      }
    );
  }

  module.exports = {
      index,
      signup,
      login,
  }