import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import YouTube from 'react-youtube';
import Model from "../../models/userModels";

class Profile extends Component {

  state = {
    email: '',
    join_date: '',
    clearance: false,
    title: [],
    artist: [],
    queue: [],
    index: null,
    display: 'none',
  }

  componentDidMount(){
    let userId;
    if (localStorage.getItem("userId") === null) {
      return this.props.history.push("/login");
    } else {
      userId = localStorage.getItem("userId");
    }
  Model.profile(userId).then(res => {
    if (res.data != null) {
    } else if (res.data === null) {
      if (localStorage.getItem("userId") != null) {
        localStorage.removeItem("userId");
      }
      return this.props.history.push("/login");
    }
    let date = res.data.join_date.split('T');
    this.setState({
      email: res.data.email,
      join_date: date[0],
      clearance: res.data.clearance,
    })
  })

  Model.getPlaylist(userId).then(res => {
    if (res.data.songs.length === 0 ) {
      this.setState({
        display: 'block',
      })
    }
    let temp = [];
    let titleList = []
    let artistList = []
    let titles = res.data.songs.map(song => { //gets title data
      let title = song.title;
      titleList.push(title)
      return titles; //remove warning
    })
    let artists = res.data.songs.map(song => { //gets artist data
      let artist = song.artist;
      artistList.push(artist)
      return artists; //remove warning
    })
    let songList = res.data.songs.map(song => { //split url to put in iframe
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
      queue: temp,
      index: queueLength, 
    })
  }).catch(error => {
    this.setState({
        notification: `${error}, something went wrong!`
    })
  });
  }// end of component did mount

  // incriments current index in playlist +1
  playPrev = (event) => {
    if (this.state.index <= 0){
      this.setState({index: this.state.queue.length-1})
    } else (
      this.setState({
        index: this.state.index - 1
      })
    ) 
  }
// incriments current index in playlist -1
  playNext = (event) => {
    if (this.state.index >= this.state.queue.length-1){
      this.setState({index: 0})
    } else (
      this.setState({
        index: this.state.index + 1
      })
    )
  }

  logout = () => {
    if (localStorage.getItem("userId") != null) {
      localStorage.removeItem("userId");
    }
    this.setState({
      auth: false,
      userId: null
    });
    this.props.history.push("/");
  };

  format = () => {
    let date = this.state.join_date.split('T')
    this.setState({
      join_date: date,
    })
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
      <div className="Login">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home" title="go home"></i>
            </NavLink>
          </button>
          <button className="homeButton">
            <NavLink to="/">
              <i className="fas fa-sign-out-alt" title="logout" onClick={this.logout}></i>
            </NavLink>
          </button>
          {this.state.clearance ?(
            <button className="homeButton">
            <NavLink to="/admin">
            <i className="fas fa-check" title="aprove"></i>
            </NavLink>
          </button>
          ):('')}
          <button className="homeButton" onClick={this.playPrev}>
            <i className="fas fa-backward" title="play previous song"></i>
          </button>
          <button className="homeButton" onClick={this.playNext}>
            <i className="fas fa-forward" title="play next song"></i>
          </button>
        </nav>
        <div id="songDetail">
          <p>{this.state.title[this.state.index]}</p>
          <p>{this.state.artist[this.state.index]}</p>
        </div>
        <div id="userDetail">
          <p>Welcome back <strong>{this.state.email}</strong></p>
          <p>member since: {this.state.join_date}</p>
        </div>
        <h1 style={{display: this.state.display, textAlign: "center" }}>Add songs to your playlist!</h1>
        <YouTube id="profilePlayer"
        videoId={this.state.queue[this.state.index]}
        opts={opts}
        onEnd={this.playNext}
      />
      </div>
    );
  }
}

export default Profile;