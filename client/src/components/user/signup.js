import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Model from "../../models/userModels";

class Signup extends Component {

    state = {
        notification: '',
    }

    componentDidMount() {
      if (localStorage.getItem("userId") != null) {
        return this.props.history.push("/profile");
      }
    }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.refs.password.value === this.refs.confirmpassword.value) {
      Model.signup(this.refs.email.value, this.refs.password.value)
        .then(res => {
          if (res.status === 404) {
            this.setState({
              notification: "request failed"
            })
          } else {
            localStorage.setItem("userId", res.data._id);
            this.props.history.push("/profile");
          }
        })
        .catch(error => {
          this.setState({
              notification: `${error}, user already exists!`
          })
        });
    } else {
      this.setState({
        notification: "passwords do not match!"
      })
    }
  };

  render() {
    return (
      <div className="Signup">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home" title="go home"></i>
            </NavLink>
          </button>
        </nav>
        <form onSubmit={this.onSubmit} className="Form">
            <h2>Signup</h2>
            <input type="email" ref="email" placeholder="Email" required="true" />
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