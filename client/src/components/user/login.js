import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Model from "../../models/userModels";

class Login extends Component {

  state ={
    notification: '',
  }

  onSubmit = (event) => {
    event.preventDefault();
    Model.login(this.refs.email.value, this.refs.password.value).then(
      res => {
        if (res.status === 404) {
          this.setState({
            notification: "request failed"
          })
        } else{
          localStorage.setItem("userId", res.data._id);
          this.props.history.push("/profile");
        }
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
            <input type="text" ref="email" placeholder="Email" required="true" />
            <input type="password" ref="password" placeholder="Password" required="true" />
            <input type="submit" value="Submit" style={{display: 'none'}} />
            <label>{this.state.notification}</label>
        </form>
      </div>
    );
  }
}

export default Login;