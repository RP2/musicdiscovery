import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Model from "../../models/userModels";

class Profile extends Component {


  render() {
    return (
      <div className="Login">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home"></i>
            </NavLink>
          </button>
        </nav>
      </div>
    );
  }
}

export default Profile;