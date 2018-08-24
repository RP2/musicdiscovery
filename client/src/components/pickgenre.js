import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Pickgenre extends Component {
  render() {
    return (
      <div className="pickgenre">
        <button id="home">
            <NavLink to="/">
                home
            </NavLink>
        </button>
      </div>
    );
  }
}

export default Pickgenre;