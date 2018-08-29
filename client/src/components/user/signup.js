import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Model from "../../models/userModels";

class Signup extends Component {

    state = {
        notification: '',
    }

  onSubmit = event => {
    event.preventDefault();
    if (this.refs.password.value === this.refs.confirmpassword.value) {
      Model.signup(this.refs.email.value, this.refs.password.value)
        .then(res => {
          if (res.status === 404) {
            console.log("request failed");
          }
          localStorage.setItem("userId", res.data._id);
          this.props.history.push("/profile");
        })
        .catch(error => {
          this.setState({
              notification: "user already exists!"
          })
          console.log(error);
        });
    } else {
      console.log("passwords do not match");
    }
  };

  render() {
    return (
      <div className="Signup">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home"></i>
            </NavLink>
          </button>
        </nav>
        <form onSubmit={this.onSubmit} className="Form">
            <h2>Signup</h2>
            <input type="email" ref="email" placeholder="Username" required="true" />
            <input type="password" ref="password" placeholder="Password" required="true" />
            <input type="password" ref="confirmpassword" placeholder="Confirm Password" required="true" />
            <input type="submit" value="Submit" style={{display: 'none'}} />
            <label>{this.state.notification}</label>
        </form>
      </div>
    );
  }
}

export default Signup;