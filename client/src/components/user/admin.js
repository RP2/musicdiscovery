import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import YouTube from 'react-youtube';
import Model from "../../models/userModels";

class Admin extends Component {

    state = {
        notification: '',
        clearance: false,
        pending: [],
        song: '',
        id: '',
        display: "none",
        temp: 'default',
    }

    componentDidMount(){
      let userId;
      let pendingList = [];
      if (localStorage.getItem("userId") === null) {
        return this.props.history.push("/login");
      } else {
        userId = localStorage.getItem("userId");
      }
      Model.profile(userId).then(res => {
        if(res.data.clearance === false) {
          return this.props.history.push("/login");
        }
        this.setState({
          clearance: true,
        })
      })// end of clearance check
      Model.pending().then(res => {
        let pendings = res.data.map(song => {
          let title = song.title
          let artist = song.artist
          let link = song.link
          let url = song.link;
          let id = song._id;
          let yt_id;
            let urlSections = url.split('/'); //creates youtube video id
            let urlEnd = urlSections[urlSections.length -1];
            let equalElement = urlEnd.includes('=')
            if (equalElement) {
              let equallink = urlEnd.split('=')
              let fixedLink = equallink[equallink.length -1];
              yt_id = fixedLink
            } else {yt_id = urlEnd;} // end of yt_id
          let pending = {title, artist, link, id, yt_id}
          pendingList.push(pending)
          return pendings // remove warning
        });
        this.setState({
          pending: pendingList,
        })
      })
    }// end of component did mount

    check = (event) => {
      let select = event.target.className
      let id = event.target.id
      this.setState({
        id: id,
        song: select,
        display: "flex",
      })
    };

    ended = (event) => {
      this.setState({
        id: '',
        song: '',
        display: "none",
      })
    }

    approve = (event) => {
      Model.approve(this.state.id).then(res => {
        let item = this.state.pending.filter( it => it.id !== res.data._id);
        this.setState({
          pending: item,
          song: '',
          display: "none",
        })
      })
    }

    delete = (event) => {
      Model.delete(this.state.id).then(res => {
        let item = this.state.pending.filter( it => it.id !== res.data._id);
        this.setState({
          pending: item,
          song: '',
          display: "none",
        })
      })
    }

  render() {
    let renderPending = this.state.pending.map(song => {
      return <li key={song.id}>{song.title}, {song.artist}, {song.link} : <button onClick={this.check} id={song.id} className={song.yt_id}>preview</button></li>
    }) 
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
        iv_load_policy: 3,
      }
    };
    return (
      <div className="Admin">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home" title="go home"></i>
            </NavLink>
          </button>
        </nav>
        <div id="adminPending">
          <div id="pendingList">
            <div>
              <h2>Pending Songs :</h2>
              <ul>
                {renderPending}
              </ul>
            </div>
          </div>
          <div id="genreDiv" style={{display: this.state.display}}>
            <YouTube
            id="genrePlayer"
              videoId={this.state.song}
              opts={opts}
              onEnd={this.ended}
            />
          </div>
          <div id="adminButton" style={{display: this.state.display}}>
            <button onClick={this.approve}>approve</button>
            <button onClick={this.delete}>delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;