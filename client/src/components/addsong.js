import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Model from "../models/requestSong.js";

class Addsong extends Component {

  state = {
    notification: null,
  }
//request form submit
  submit = (event) => {
    event.preventDefault()
    let link = this.refs.link.value; //checks link
    if (link.includes('https://youtu.be/') || link.includes('https://www.youtube.com/watch?v=')) {
      console.log(link)
      this.setState({
        notification: null
      }) //send form data
      let genreVal = this.refs.genre.value
      let genre = genreVal.charAt(0).toUpperCase() + genreVal.substring(1).toLowerCase();
      Model.request({
        title: this.refs.title.value,
        artist: this.refs.artist.value,
        genre: genre,
        link: this.refs.link.value
      }).then(res => {
        if (res.status === 404) {
          console.log("oops, something went wrong!")
        }
      }) // redirect after submit
      this.props.history.push("/")
    } else { //error notification
      this.setState({
        notification: "please enter a url like 'https://youtu.be/HUKsUtHx4QU' or 'https://www.youtube.com/watch?v=3bNITQR4Uso'."
      })
    }
  }

  render() {
    return (
      <div className="addsong">
        <nav>
          <button className="homeButton">
              <NavLink to="/">
              <i className="fas fa-home"></i>
              </NavLink>
          </button>
        </nav>
        <form className="Form" onSubmit={this.submit}>
          <h2>Request A Song</h2>
          <input type="text" ref="title" required="true" placeholder="Title"/>
          <input type="text" ref="artist" required="true" placeholder="Artist" />
          <input type="text" ref="genre" required="true" placeholder="Genre" />
          <input type="text" ref="link" required="true" placeholder="Link" />
          <input type="submit" value="Submit" style={{display: 'none'}}/>
          <label>{this.state.notification}</label>
        </form>
      </div>
    );
  }
}

export default Addsong;