import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Model from "../models/getPlaylist.js";

class Home extends Component {

  state = {
    queue: [],
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
      })
      this.setState({ queue: temp })
    });
    // let link = "W-gN-rUxtio"
    // this.setState({
    //   link: link,
    // })
  }



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
          <button>
            prev
          </button>
          <button>
            next
          </button>
        </nav>
        <iframe src={`https://www.youtube.com/embed/${this.state.queue[0]}?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
        </iframe>
      </div>
    );
  }
}

export default Home;