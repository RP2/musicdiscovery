//index schema
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/wayfarer",
  { useNewUrlParser: true }
);

let song = require("./song.js");
let playlist = require("./playlist.js");
let user = require("./user.js");


module.exports = {
  song: song,
  playlist: playlist,
  user: user,
};