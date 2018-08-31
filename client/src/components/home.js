import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { NavLink } from "react-router-dom";
import Model from "../models/getPlaylist.js";
import userModel from "../models/userModels.js";

class Home extends Component {

  state = {
    auth: false,
    userId: null,
    title: [],
    artist: [],
    song_id: [],
    queue: [],
    index: null,
    notification: '',
  }
//onMount, gets playlist from backend and splices the urls
  componentDidMount() {
    Model.getPlaylist().then(res => {
      let temp = [];
      let titleList = [];
      let artistList = [];
      let song_idList = [];
      let titles = res.data.map(song => { //gets title data
        let title = song.title;
        titleList.push(title)
        return titles; //remove warning
      })
      let artists = res.data.map(song => { //gets artist data
        let artist = song.artist;
        artistList.push(artist)
        return artists; //remove warning
      })
      let song_id = res.data.map(song => { //gets song id
        let id = song._id;
        song_idList.push(id)
        return song_id; //remove warning
      })
      let songList = res.data.map(song => { //split url to put in iframe
        let url = song.link;
        let urlSections = url.split('/');
        let urlEnd = urlSections[urlSections.length -1];
        let equalElement = urlEnd.includes('=')
        if (equalElement) {
          let equallink = urlEnd.split('=')
          let link = equallink[equallink.length -1];
          temp.push(link);
        } else {temp.push(urlEnd);}
        return songList; //remove warnings
      })
      //randomly sets initial song, change number based on number of songs
      let queueLength = Math.floor(Math.random() * temp.length)
      this.setState({
        title: titleList,
        artist: artistList,
        song_id: song_idList,
        queue: temp,
        index: queueLength, 
      })
    }); 
    if (localStorage.getItem("userId") != null) {
      this.setState({
        auth: true,
        userId: localStorage.getItem("userId")
      });
    }
  }
// incriments current index in playlist +1
  playPrev = (event) => {
    if (this.state.index <= 0){
      this.setState({
        index: this.state.queue.length-1,
        notification: "",
      })
    } else (
      this.setState({
        index: this.state.index - 1,
        notification: "",
      })
    ) 
  }
// incriments current index in playlist -1
  playNext = (event) => {
    if (this.state.index >= this.state.queue.length-1){
      this.setState({
        index: 0,
        notification: "",
      })
    } else (
      this.setState({
        index: this.state.index + 1,
        notification: ""
      })
    )
  }

  saveSong = (event) => {
    if (localStorage.getItem("userId") != null) {
      userModel.saveSong(this.state.userId, this.state.song_id[this.state.index]).then(res => {
        this.setState({
          notification: "saved successfully!"
        })
      }).catch(error => {
        this.setState({
            notification: `${error}, something went wrong!`
        })
      });
    } else {
      return this.props.history.push('/login');
    }
  }
  

  render() {
    const opts = {
      height: '720',
      width: '1280',
      playerVars: {
        autoplay: 1,
        wmode:"opaque",
        rel: 0,
        controls: 0,
        showinfo: 0,
        frameBorder: 0,
        allow: "autoplay",
      }
    };
    return (
      <div className="home">
        <nav>
          <button className="homeButton" id="pickgenre">
              <NavLink to="/pickgenre">
              <i className="fas fa-filter" title="genre filter"></i>
              </NavLink>
          </button>
          <button className="homeButton" id="addsong">
              <NavLink to="/addsong">
              <i className="fas fa-plus" title="request a song"></i>
              </NavLink>
          </button>
          <button className="homeButton" onClick={this.playPrev}>
          <i className="fas fa-backward" title="play previous song"></i>
          </button>
          <button className="homeButton" onClick={this.playNext}>
          <i className="fas fa-forward" title="play next song"></i>
          </button>
          <button className="homeButton" id="addsong">
            {this.state.auth ? (
              <NavLink to="/profile">
                <i className="fas fa-user" title="profile"></i>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <i className="fas fa-user" title="login"></i>
              </NavLink>
            )}
          </button>
        </nav>
        <div id="songDetail">
          <p>{this.state.notification}</p>
          <button style={{margin: "0"}}>
          <i className="fas fa-save" onClick={this.saveSong} title="save song"></i>
          </button>
          <p>{this.state.title[this.state.index]}</p>
          <p>{this.state.artist[this.state.index]}</p>
        </div>
        <YouTube
        id="homePlayer"
        videoId={this.state.queue[this.state.index]}
        opts={opts}
        onEnd={this.playNext}
      />
      </div>
    );
  }
}

export default Home;