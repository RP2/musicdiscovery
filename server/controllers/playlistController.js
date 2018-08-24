const db = require("../models");
//get playlist
const playlist = (req, res) => {
    db.playlist.find({}, (err, foundPlaylist) => {
        if (err) {
            console.log("playlist error", err);
        }
        res.status(200).json(foundPlaylist);
    });
};
//post new song
const savesong = (req, res) => {
    db.playlist.create(req.body, (err, newSong) => {
        if (err){
            console.log("savesong error", err);
        }
        res.status(200).json(newSong);
    });
};
//get pending songs
const pending = (req, res) => {
    db.song.find({status: false}, (err, pendingSong) => {
        if (err){
            console.log("pending song error", err);
        }
        res.status(200).json(pendingSong);
    });
};
//aprove song status
const approve = (req, res) => {
    db.song.findByIdAndUpdate({song: req.params.song_id}, (err, updateStatus) => {
        if (err){
            console.log("update song status error", err);
        }
        updateStatus.status = req.body.status;
        updateStatus.save = (err, savedStatus) =>{
            res.status(200).json(savedStatus);
        }
    });
};
//delete songs
const remove = (req, res) => {
    db.song.findByIdAndRemove({song: req.params.song_id}, (err, deleteSong) => {
        if (err){
            console.log("delete song error", err);
        }
        res.status(200).json(deleteSong);
    });
};
//export
module.expors = {
    playlist: playlist,
    savesong: savesong,
    pending: pending,
    approve: approve,
    remove: remove,
}