import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Model from "../models/getPlaylist.js";

class Home extends Component {

  state = {
    queue: [],
    index: null,
  }
//onMount, gets playlist from backend and splices the urls
  componentDidMount() {
    Model.getPlaylist().then(res => {
      let temp = [];
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
      //randomly sets initial song, change number based on number of songs
      let queueLength = Math.floor(Math.random() * temp.length)
      this.setState({ 
        queue: temp,
        index: queueLength, 
      })
    }); 
  }
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
  render() {
    return (
      <div className="home">
        <nav>
          <button className="homeButton" id="pickgenre">
              <NavLink to="/pickgenre">
              <i className="fas fa-filter"></i>
              </NavLink>
          </button>
          <button className="homeButton" id="addsong">
              <NavLink to="/addsong">
              <i className="fas fa-plus"></i>
              </NavLink>
          </button>
          <button className="homeButton" onClick={this.playPrev}>
          <i className="fas fa-backward"></i>
          </button>
          <button className="homeButton" onClick={this.playNext}>
          <i className="fas fa-forward"></i>
          </button>
        </nav>
        <iframe title="music" src={`https://www.youtube.com/embed/${this.state.queue[this.state.index]}?wmode=opaque&rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
        </iframe>
      </div>
    );
  }
}

export default Home;