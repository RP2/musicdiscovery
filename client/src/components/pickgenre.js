import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import YouTube from 'react-youtube';
import Model from "../models/filterSongs.js";
import userModel from "../models/userModels.js";

class Pickgenre extends Component {

  state = {
    queue: [],
    userId: null,
    index: null,
    title: [],
    artist: [],
    song_id: [],
    display: 'none',
    displayBlock: 'none',
    notification: '',
  }

  componentDidMount = () => {
    if (localStorage.getItem("userId") != null) {
      this.setState({
        auth: true,
        userId: localStorage.getItem("userId")
      });
    }
  }

  submit = (event) => {
    event.preventDefault();
    Model.filter({
      genre: this.refs.genre.value
    }).then(res => {
      if (res.status === 404) {
        console.log("oops, something went wrong!")
      } else if (res.data.length === 0) {
        this.setState({
          queue: [],
          display: 'none',
          notification: 'that genre does not exist :('
        })
      } else {
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
        let songList = res.data.map(song => {
          let url = song.link;
          let urlSections = url.split('/');
          let urlEnd = urlSections[urlSections.length -1];
          let equalElement = urlEnd.includes('=')
          if (equalElement) {
            let equallink = urlEnd.split('=')
            let link = equallink[equallink.length -1];
            temp.push(link);
          } else {temp.push(urlEnd);}
          return songList;
        })
        let queueLength = Math.floor(Math.random() * temp.length)
        this.setState({ 
          title: titleList,
          artist: artistList,
          song_id: song_idList,
          queue: temp,
          index: queueLength,
          display: 'flex',
          displayBlock: 'block',
          notification: '',
        })
      }
    })
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
      <div className="pickgenre">
        <nav>
          <button className="homeButton">
              <NavLink to="/">
              <i className="fas fa-home" title="go home"></i>
              </NavLink>
          </button>
        </nav>
        <form className="Form" onSubmit={this.submit}>
          <h2>Find A Genre</h2>
          <input type="text" ref="genre" placeholder="Genre" required="true"/>
          <input type="submit" value="Submit" style={{display: 'none'}}/>
          <label>{this.state.notification}</label>
        </form>
        <div id="songDetail" style={{display: this.state.displayBlock}}>
            <i className="fas fa-save" onClick={this.saveSong} title="save song" style={{cursor: "pointer"}}></i>
          <p>{this.state.title[this.state.index]}</p>
          <p>{this.state.artist[this.state.index]}</p>
        </div>
        <div id="genreDiv" style={{display: this.state.display}}>
          <YouTube
          id="genrePlayer"
            videoId={this.state.queue[this.state.index]}
            opts={opts}
            onEnd={this.playNext}
          />
        </div>
        <div id="genreButtons" style={{display: this.state.display}}>
          <button className="homeButton" onClick={this.playPrev}>
            <i className="fas fa-backward" title="play previous song"></i>
          </button>
          <button className="homeButton" onClick={this.playNext}>
            <i className="fas fa-forward" title="play next song"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Pickgenre;