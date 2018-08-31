import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Model from "../../models/userModels";

class Admin extends Component {

    state = {
        notification: '',
        clearance: false,
        pending: [],
    }

    componentDidMount(){
      let userId;
      let pendingList = [];
      if (localStorage.getItem("userId") === null) {
        return this.props.history.push("/login");
      } else {
        userId = localStorage.getItem("userId");
      }
      Model.profile(userId).then(res => {
        if(res.data.clearance === false) {
          return this.props.history.push("/login");
        }
        this.setState({
          clearance: true,
        })
      })// end of clearance check
      Model.pending().then(res => {
        let pendings = res.data.map(song => {
          let pending = song._id
          pendingList.push(pending)
          return pendings
        });
        this.setState({
          pending: pendingList,
        })
        console.log(this.state.pending)
      })
    }// end of component did mount

  render() {
    let renderPending = this.state.pending.map(_id => {
      return <li key={_id}>{_id}</li>
    }) 
    return (
      <div className="Admin">
        <nav>
          <button className="homeButton">
            <NavLink to="/">
                <i className="fas fa-home" title="go home"></i>
            </NavLink>
          </button>
        </nav>
        <div id="adminPending">
        <h2>Pending Songs :</h2>
          <ul>
            {renderPending}
          </ul>
        </div>
      </div>
    );
  }
}

export default Admin;