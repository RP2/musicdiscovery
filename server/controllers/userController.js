const db = require("../models");

// GET /api/users
const index = (req, res) => {
    // access database and pull out all users
    db.user.find({},(err, allUsers) => {
      if (err) {
        console.log("error", err);
      }
      res.json(allUsers);
    });
  }

// POST /api/users/si
const signup = (req, res) => {
    db.user.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else if (foundUser) {
        console.log("User Already Exists:", foundUser);
        res.status(400).send("User Already Exists");
      } else {
        let newUser = new db.user(req.body);
        db.playlist.create({global: false}, (err, userPlaylist) => {
          if (err) {
            throw err
          }
          newUser.playlist = userPlaylist._id;
          newUser.save()
        })
        res.status(200).json(newUser);
        };
    });
  }

  //login function
const login = (req, res) => {
    db.user.findOne(
      { email: req.body.email, password: req.body.password },
      (err, foundUser) => {
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

  // user profile
const profile = (req, res) => {
  console.log(req.params)
  db.user.findOne({ _id: req.params.user_id },(err, foundUser) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(foundUser);
  });
}

const playlist = (req, res) => {
  db.user.findOne({ _id: req.params.user_id }, (err, foundUser) => {
    if (err) {
      throw err
    }
    db.playlist.findById(foundUser.playlist)
      .populate('songs')
      .exec((err, allSongs) => {
        if (err) throw err;
        res.json(allSongs)
      })
  })
}

const saveSong = (req, res) => {
  db.user.findOne({_id: req.params.user_id}, (err, foundUser) =>{
    if (err) {
      return err;
    }
    db.playlist.findOne({_id: foundUser.playlist}, (err, foundPlaylist) => {
      if (err) {
        return err;
      }
      foundPlaylist.songs.push(req.body._id);
      foundPlaylist.save();
    });
    res.status(200).json(foundUser.playlist);
  });
}


  module.exports = {
      index,
      signup,
      login,
      profile,
      playlist,
      saveSong,
  }