import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Model from "../../models/userModels";

class Login extends Component {
  onSubmit = (event) => {
    event.preventDefault();
    Model.login(this.refs.email.value, this.refs.password.value).then(
      res => {
        if (res.status === 404) {
          console.log("request failed");
        }
        localStorage.setItem("userId", res.data._id);
        this.props.history.push("/profile");
      }
    );
  };

  render() {
    return (
      <div className="Login">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home"></i>
            </NavLink>
          </button>
          <button id="signup">
            <NavLink to="/signup">
                <i className="fas fa-user-plus"></i>
            </NavLink>
          </button>
        </nav>
        <form onSubmit={this.onSubmit} className="Form">
            <h2>Login</h2>
            <input type="text" ref="email" placeholder="Username" required="true" />
            <input type="password" ref="password" placeholder="Password" required="true" />
            <input type="submit" value="Submit" style={{display: 'none'}} />
        </form>
      </div>
    );
  }
}

export default Login;