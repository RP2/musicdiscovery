const db = require("../models");

//get playlist
const index = (req, res) => {
    db.playlist.findOne({global: true})
    .populate('songs')
    .exec((err, foundPlaylist) => {
        if (err) {
            console.log("playlist error", err);
        }
        console.log(foundPlaylist)
        let songs = foundPlaylist.songs.filter(song => {
            return song.status === true
        })
        res.status(200).json(songs);
    })
};

const songindex = (req, res) => {
    db.song.find({}, (err, foundSongs) => {
        if (err) {
            console.log("get all songs error", err);
        }
        res.status(200).json(foundSongs);
    });
};

const filter = (req, res) => {
    console.log(req.params.genre)
    db.playlist.findOne({global: true})
        .populate('songs')
        .exec((err, foundPlaylist) => {
            if (err) {
                console.log("playlist error", err);
            }
            console.log(foundPlaylist)
            let songs = foundPlaylist.songs.filter(song => {
                return song.genre === req.params.genre
            })
            res.status(200).json(songs);
        })
}

const show = (req, res) => {
    db.playlist.findById(req.params.playlist_id, (err, foundPlaylist) => {
        if (err){
            console.log("Show song error", err);
        }
        res.status(200).json(foundPlaylist);
    })
}

//post new song
const request = (req, res) => {
    db.song.findOne({title: req.body.title}, (err, foundSong) => {
        if (err){console.log(err)}
        if (foundSong){
            console.log("song already exists")
        } else {
            db.song.create(req.body, (err, newSong) => {
                if (err){
                    console.log("savesong error", err);
                }
                db.playlist.findOne({global: true}, (err, foundPlaylist) => {
                    console.log(foundPlaylist)
                    foundPlaylist.songs.push(newSong._id);
                    foundPlaylist.save();
                });
                res.status(200).json(newSong);
            });
        }
    })
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
    console.log(req.params.song_id)
    db.song.findByIdAndUpdate({_id: req.params.song_id}, req.body, {new:true}, (err, updateStatus) => {
        if (err){
            console.log("update song status error", err);
        }
        // updateStatus.status = true;
        // updateStatus.save = (err, savedStatus) =>{
            res.status(200).json(updateStatus);
        // }
    });
};
//delete songs
const destroy = (req, res) => {
    db.song.findByIdAndRemove({_id: req.params.song_id}, (err, deleteSong) => {
        if (err){
            console.log("delete song error", err);
        }
        res.status(200).json(deleteSong);
    });
};

//export
module.exports = {
    index,
    songindex,
    filter,
    show,
    request,
    pending: pending,
    approve: approve,
    destroy,
}