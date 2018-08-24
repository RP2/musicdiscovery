//playlist schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let song = require("./song.js");

let playlistSchema = new Schema({
    global: Boolean,
    songs: [
        {
            ref: "song",
            type: Schema.Types.ObjectId,
        }
    ],
})


let playlist = mongoose.model("playlist", playlistSchema);

module.exports = playlist;