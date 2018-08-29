//require cors, express, 
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//use cors
app.use(cors());
//add body parser as middleware for server
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
//require models & controllers directory
const db = require("./models");
const controllers = require("./controllers");

//Routes

//global routes
app.get("/api/playlist", controllers.playlist.index);
app.post("/api/playlist", controllers.playlist.request);
app.get("/api/playlist/songs/:genre", controllers.playlist.filter);
app.get("/api/playlist/:playlist_id", controllers.playlist.show);
app.get("/api/songs", controllers.playlist.songindex);
//admin routes
app.get("/api/playlist/pending", controllers.playlist.pending);
app.put("/api/playlist/pending/:song_id", controllers.playlist.approve);
app.delete("/api/playlist/pending/:song_id", controllers.playlist.destroy);
//user account routes
app.get("/api/users", controllers.user.index)
app.post("/api/users/login", controllers.user.login);
app.post("/api/users/signup", controllers.user.signup);
// //user profile routes
// app.get("/api/users/:user_id", controllers.user.profile)
// app.put("/api/users/:user_id", controllers.user.edit);
// app.delete("/api/users/:user_id", controllers.user.remove);
// //user playlist routes
// app.get("/api/user/:user_id/playlist", controllers.user.playlist);
// app.post("/api/users/:user_id/playlist", controllers.user.savesong);

// listen on port 4000
app.listen(process.env.PORT || 4000, () => {
    console.log("Express server is up and running on http://localhost:4000/");
  });