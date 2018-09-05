import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class About extends Component {

  render() {
    return (
      <div className="about">
        <nav>
          <button className="homeButton">
              <NavLink to="/">
              <i className="fas fa-home" title="go home"></i>
              </NavLink>
          </button>
        </nav>
        <div id="aboutDiv">
            <div id="aboutContent">
                <h2>About Discover Music</h2>
                <hr></hr>
                <p>The mission is to provide everyone an open playlist to share and discover new music. Whether you register an account or just want to anonymously share a song, everyone can contribute to our playlist.</p>
                <h2>Rules & Answers</h2>
                <hr></hr>
                <ul>
                    <li>song requests can only contain youtube links</li>
                    <li>all requests will remain pending until approved by an admin</li>
                    <li>requests that contain non music links or have inaccurate information will be removed</li>
                    <li>duplicate entries will also be removed</li>
                    <li>only registered users can save a song to their personal playlist</li>
                </ul>
                <h6>To learn more about this project visit the github repository : <a target="_blank" rel="noopener noreferrer" href="https://github.com/RP2/musicdiscovery" >Link</a> </h6>
            </div>
        </div>
      </div>
    );
  }
}

export default About;