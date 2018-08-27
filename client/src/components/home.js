import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Model from "../models/getPlaylist.js";

class Home extends Component {

  state = {
    queue: [],
    index: null,
  }

  componentDidMount() {
    Model.getPlaylist().then(res => {
      let temp = [];
      let songList = res.data[0].songs.map(song => {
        let url = song.link;
        let urlSections = url.split('/');
        let urlEnd = urlSections[urlSections.length -1];
        let equalElement = urlEnd.includes('=')
        if (equalElement) {
          let equallink = urlEnd.split('=')
          console.log(equallink)
          let link = equallink[equallink.length -1];
          temp.push(link);
        } else {temp.push(urlEnd);}
        
        console.log(temp)
        return songList;
      })
      this.setState({ queue: temp })
    });
    //randomly sets initial song, change number based on number of songs
    this.state.index = Math.floor(Math.random() * 3);
  }


  playPrev = (event) => {
    if (this.state.index <= 0){
      this.setState({index: this.state.queue.length-1})
    } else (
      this.setState({
        index: this.state.index - 1
      })
    ) 
  }

  playNext = (event) => {
    if (this.state.index >= this.state.queue.length-1){
      this.setState({index: 0})
    } else (
      this.setState({
        index: this.state.index + 1
      })
    )
  }

  // onKeydown = (event) => {
  //   switch (event) {
  //     case 37:
  //       playPrev();
  //       break;
  //     case 39:
  //       playNext();
  //       break;
  //   }
  // }
  
  render() {
    return (
      <div className="home">
        <nav>
          <button id="pickgenre">
              <NavLink to="/pickgenre">
                  pick a genre
              </NavLink>
          </button>
          <button id="addsong">
              <NavLink to="/addsong">
                  add a song
              </NavLink>
          </button>
          <button onClick={this.playPrev}>
            prev
          </button>
          <button onClick={this.playNext}>
            next
          </button>
        </nav>
        <iframe title="music" src={`https://www.youtube.com/embed/${this.state.queue[this.state.index]}?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
        </iframe>
      </div>
    );
  }
}

export default Home;