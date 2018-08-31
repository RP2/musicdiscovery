import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Model from "../../models/userModels";

class Admin extends Component {

    state = {
        notification: '',
    }

  render() {
    return (
      <div className="Admin">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home" title="go home"></i>
            </NavLink>
          </button>
        </nav>
      </div>
    );
  }
}

export default Admin;