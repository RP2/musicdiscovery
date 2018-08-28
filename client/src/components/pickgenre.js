import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Model from "../models/filterSongs.js";

class Pickgenre extends Component {

  state = {
    queue: [],
    index: null,
    display: 'none',
    notification: '',
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
        console.log(res.data)
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
        let queueLength = Math.floor(Math.random() * temp.length)
        this.setState({ 
          queue: temp,
          index: queueLength,
          display: 'flex',
          notification: '',
        })
      }
    })
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
      <div className="pickgenre">
        <nav>
          <button id="home">
              <NavLink to="/">
              <i className="fas fa-home"></i>
              </NavLink>
          </button>
        </nav>
        <form id="requestForm" onSubmit={this.submit}>
          <h2>Find A Genre</h2>
          <input type="text" ref="genre" placeholder="Genre" required="true"/>
          <input type="submit" value="Submit" style={{display: 'none'}}/>
          <label>{this.state.notification}</label>
        </form>
        <div id="genreDiv" style={{display: this.state.display}}>
          <iframe id="genrePlayer" title="music" src={`https://www.youtube.com/embed/${this.state.queue[this.state.index]}?wmode=opaque&rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
          </iframe>
        </div>
        <div id="genreButtons" style={{display: this.state.display}}>
          <button className="homeButton" onClick={this.playPrev}>
            <i className="fas fa-backward"></i>
          </button>
          <button className="homeButton" onClick={this.playNext}>
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Pickgenre;