const db = require("./models");

let song_list = [
    {
        title: "The Edge of Green",
        artist: "Radiant Historia",
        genre: "Game",
        link: "https://youtu.be/W-gN-rUxtio",
        status: true,
    },
    {
        title: "Jason",
        artist: "The Midnight",
        genre: "Electronic",
        link: "https://youtu.be/HUKsUtHx4QU",
        status: true,
    },
    {
        title: "Plastic Love",
        artist: "Mariya Takeuchi",
        genre: "Funk",
        link: "https://www.youtube.com/watch?v=3bNITQR4Uso",
        status: false,
    },
    {
        title: "Frog's Theme",
        artist: "Chrono Trigger",
        genre: "Game",
        link: "https://youtu.be/9YsAyO9oW00",
        status: true,
    },
]

let play_list = [
    {
        global: true,
    }
]

let user = [
    {
        email: 'test',
        password: 'test',
    }
]


db.song.remove({}, (err, removedSongs) => {
    if (err) throw err;
    db.song.create(song_list, (err, createdSongs) => {
        if (err) throw err;
        console.log('Songs created successfully');
        db.playlist.remove({}, (err, removedList) => {
            console.log('Playlist removed successfully!')
            if (err) throw err;
            console.log('Creating new Playlist...')
            let newPlaylist = new db.playlist({global: true});
            // if (err) throw err;
            console.log('New Playlist created successfully!');
            createdSongs.forEach(song => {
                newPlaylist.songs.push(song._id);
                // process.exit();
                // newPlaylist.save((err, savedPlaylist) => {
                //     if (err) throw err;
                //     process.exit();
                // });
            })
            console.log('Plalist updated....')
            newPlaylist.save((err, savedList) => {
                console.log(newPlaylist.id);
                process.exit();
            });
            
            // })
        })
        // process.exit();
    })
})

db.user.remove({}, (err, removedUser) => {
    if (err) throw err;
    db.user.create(user, (err, newUser) => {
        if (err) throw err;
        console.log('New User created successfully!')
    })
})



// console.log('Removing Users, Songs, and Playlists...')
// db.song.remove({}, (err, removedSongs) => {
//     if (err) throw err;
//     db.playlist.remove({}, (err, removedPlaylists) => {
//         if (err) throw err;
//         db.user.remove({}, (err, removedUsers) => {
//             if (err) throw err;
//             console.log('Successfully deleted!')
//             console.log('Creating new user')
//             let newUser = new db.user(user, (err, createdUser) => {
//                 if (err) throw err;
//                 console.log('User created successfully!')
//                 console.log('Creating new playlist')
//                 let newPlaylist = new db.playlist(playlist, (err, createdPlaylist) => {
//                     if (err) throw err;
//                     console.log('Playlist created successfully')
//                     console.log('Creating new songs...')
//                     let newSongs = new db.song(song_list, (err, createdSongs) => {
//                         if (err) throw err;
//                         console.log('New songs created successfully')
//                         createdUser.playlist = createdPlaylist._id;
//                         createdUser.save();
//                         createdSongs.forEach(song => {
//                             return createdPlaylist.songs.push(song._id);
//                         });
//                         createdPlaylist.save();
//                         createdSongs.save((err, songsSaved) => {
//                             process.exit();
//                         });
//                     })
//                 })
//             })
//         })
//     })
// })

// db.song.remove({}, (err, removedSongs) => {
//     if (err) throw err;
//     db.playlist.remove({}, (err, removedPlaylists) => {
//         if (err) throw err;
//         db.user.remove({}, (err, removedUsers) => {
//             if (err) throw err;
//             db.playlist.create(playlist, (err, savedPlaylist) => {
//                 if (err) throw err;
//                 db.song.create(song_list, (err, savedSongs) => {
//                     if (err) throw err;
//                     db.user.create(user, (err, savedUser) => {
//                         if (err) throw err;
//                         process.exit()
//                     })
//                 })
//             })
//         })
//     })
// })