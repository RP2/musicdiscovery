import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Pickgenre extends Component {
  render() {
    return (
      <div className="pickgenre">
        <nav>
          <button id="home">
              <NavLink to="/">
                  home
              </NavLink>
          </button>
        </nav>
      </div>
    );
  }
}

export default Pickgenre;