//index schema
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/wayfarer",
  { useNewUrlParser: true }
);

let user = require("./user.js");
let playlist = require("./playlist.js");
let song = require("./song.js");


module.exports = {
  user: user,
  playlist: playlist,
  song: song,
};