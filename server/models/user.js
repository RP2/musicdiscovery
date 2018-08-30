//user schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let playlist = require("./playlist.js");

let userSchema = new Schema({
    clearance: { type: Boolean, default: false},
    email: String,
    password: String,
    join_date: { type: Date, default: Date.now },
    playlist: {
            ref: "playlist",
            type: Schema.Types.ObjectId,
        },
})


let user = mongoose.model("user", userSchema);

module.exports = user;