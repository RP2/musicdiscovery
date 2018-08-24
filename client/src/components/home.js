import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="home">
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
      </div>
    );
  }
}

export default Home;