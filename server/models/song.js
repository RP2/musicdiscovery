//playlist schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./user.js");

let songSchema = new Schema({
        title: String,
        artist: String,
        genre: String,
        link: String,
        status: {type: Boolean, default: false},
})


let song = mongoose.model("song", songSchema);

module.exports = song;