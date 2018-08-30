import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Model from "../../models/userModels";

class Profile extends Component {

  state = {
    email: '',
    join_date: '',
  }

  componentDidMount(){
    let userId;
    if (localStorage.getItem("userId") === null) {
      return this.props.history.push("/login");
    } else {
      userId = localStorage.getItem("userId");
    }
  Model.profile(userId).then(res => {
    if (res.data != null) {
    } else if (res.data === null) {
      if (localStorage.getItem("userId") != null) {
        localStorage.removeItem("userId");
      }
      return this.props.history.push("/login");
    }
    let date = res.data.join_date.split('T');
    this.setState({
      email: res.data.email,
      join_date: date[0],
    })
  })
  
  }

  logout = () => {
    if (localStorage.getItem("userId") != null) {
      localStorage.removeItem("userId");
    }
    this.setState({
      auth: false,
      userId: null
    });
    this.props.history.push("/");
  };

  format = () => {
    let date = this.state.join_date.split('T')
    this.setState({
      join_date: date,
    })
  }

  render() {
    return (
      <div className="Login">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home"></i>
            </NavLink>
          </button>
          <button className="homeButton">
            <NavLink to="/">
              <i className="fas fa-sign-out-alt" onClick={this.logout}></i>
            </NavLink>
          </button>
          <p>Welcome back <strong>{this.state.email}</strong></p>
          <p>member since: {this.state.join_date}</p>
        </nav>
      </div>
    );
  }
}

export default Profile;