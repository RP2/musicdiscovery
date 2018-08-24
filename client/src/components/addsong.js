import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Addsong extends Component {
  render() {
    return (
      <div className="addsong">
        <button id="home">
            <NavLink to="/">
                home
            </NavLink>
        </button>
      </div>
    );
  }
}

export default Addsong;