import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Addsong extends Component {
  render() {
    return (
      <div className="addsong">
        <nav>
          <button id="home">
              <NavLink to="/">
              <i class="fas fa-home"></i>
              </NavLink>
          </button>
        </nav>
      </div>
    );
  }
}

export default Addsong;